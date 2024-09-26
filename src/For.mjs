// @ts-check

import { $ } from './$.mjs';
import { Derived } from './Derived.mjs';
import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - assign element to loop through ['List'](#list) as data to render child element using class instantiation;
 * - naming html attribute:
 * > - `forAttributeName` use `for-` as prefix in html;
 * > - keys form `List` can reflect to DOM by prefixing with `c-${forAttributeNameNoForPrefix}-`;
 * > - internal `signal` with `attributeName` argument will mess with `lifecycle` due to naming collision;
 * > - anything that needs to reflect to dom, is to be added to the List record, for convenient;
 * > - you can however by prefixing the `attributeName` with `c-${forAttributeNameNoForPrefix}-` with
 * >   `childAttrPrefix`;
 * - loped childElement:
 * > - must have `HTMLElement` as first children;
 * > - only first children will be used to loop through `List`, all other children will be deleted from the dom on `onConnected` event of parentElement;
 */
export class For {
	/**
	 * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
	 * @typedef {import('./List.mjs').ListValue_} ListValue
	 * @typedef {Object} childLifeCycleCallback
	 * @property {(arg0:{childElement:HTMLElement,ForController:For,childAttrPrefix:string})=>Promise<void>} childLifeCycleCallback.onConnected
	 * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onDisconnected
	 * @property {(arg0:{childElement:HTMLElement,ForController:For,attributeName:string, newValue:string})=>Promise<void>} childLifeCycleCallback.onAttributeChanged
	 */
	/**
	 * @param {import('./List.mjs').List} listInstance
	 * @param {string} forAttributeName
	 * - parent attributeName
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {import('./documentScope.type.mjs').documentScope} documentScope
	 */
	constructor(listInstance, forAttributeName, childLifeCycleCallback, documentScope = document) {
		this.listInstance = listInstance;
		this.attr = forAttributeName;
		this.DS = documentScope;
		new Lifecycle(
			{
				[`${helper.FA}${forAttributeName}`]: async ({
					element,
					onConnected,
					onDisconnected,
				}) => {
					onConnected(async () => {
						const effect = new $(async () => {
							await this.HML(listInstance.mutation.value);
						});
						onDisconnected(async () => {
							listInstance.mutation.remove$(effect);
						});
						this.PC(element, childLifeCycleCallback, onDisconnected);
					});
				},
			},
			documentScope
		);
	}
	/**
	 * onParentConnected
	 * @private
	 * @param {HTMLElement} parentElement
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	PC = (parentElement, childLifeCycleCallback, onParentDisconnected) => {
		this.parentElement = parentElement;
		this.childElement = parentElement.children[0];
		if (!this.childElement) {
			console.error({
				parentElement: this.parentElement,
				childElement: this.childElement,
				message: 'no `childElement` in the `parentElement`',
				solution: 'create `HTMLElement` as children[0] on `parentElement`',
			});
			return;
		}
		/**
		 * @type {ListValue[]}
		 */
		const listValue = this.listInstance.value;
		this.childElement.setAttribute(`${helper.FCA}${this.attr}`, '');
		parentElement.innerHTML = '';
		this.CL(childLifeCycleCallback, onParentDisconnected);
		for (let i = 0; i < listValue.length; i++) {
			const childElement_ = this.childElement.cloneNode(true);
			if (!(childElement_ instanceof HTMLElement)) {
				continue;
			}
			parentElement.appendChild(childElement_);
		}
	};
	/**
	 * childLifecycle
	 * @private
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	CL = (childLifeCycleCallback, onParentDisconnected) => {
		const childLifecycle = new Lifecycle(
			{
				[`${helper.FCA}${this.attr}`]: async ({
					element: childElement,
					onConnected,
					onDisconnected,
					onAttributeChanged,
				}) => {
					onAttributeChanged(async ({ attributeName, newValue }) => {
						await childLifeCycleCallback.onAttributeChanged({
							childElement,
							ForController: this,
							attributeName,
							newValue,
						});
					});
					onConnected(async () => {
						const childAttrPrefix = `${helper.CDB}${this.attr}-`;
						await childLifeCycleCallback.onConnected({
							childElement,
							ForController: this,
							childAttrPrefix,
						});
						const index = this.CI(childElement);
						/**
						 * @type {ListValue}
						 */
						const data = this.listInstance.value[index];
						/**
						 * @type {{[dataName:string]:Derived<string>}}
						 */
						// @ts-ignore
						const derived = {};
						for (const dataName in data) {
							derived[dataName] = new Derived(
								async () => data[dataName].value,
								`${childAttrPrefix}${dataName}`,
								childElement
							);
						}
						onDisconnected(async () => {
							await childLifeCycleCallback.onDisconnected({
								childElement,
								ForController: this,
							});
							for (const dataName in data) {
								derived[dataName].unRef();
								derived[dataName] = null;
							}
						});
					});
				},
			},
			this.parentElement
		);
		onParentDisconnected(async () => {
			childLifecycle.disconnect();
		});
	};
	/**
	 * getChildElementIndex
	 * @private
	 * @param {HTMLElement} childElement
	 * @returns {number}
	 */
	CI(childElement) {
		const parentElement = this.parentElement;
		const children = Array.from(parentElement.children);
		return children.indexOf(childElement);
	}
	/**
	 * @type {string}
	 */
	attr;
	/**
	 * handleMutationList
	 * @private
	 * @param {import('./List.mjs').mutationType} mutationValue
	 * @returns {Promise<void>}
	 */
	HML = async (mutationValue) => {
		switch (mutationValue.type) {
			case '':
				/**
				 * initial auto subscribe
				 */
				return;
			case 'push':
				this.HP(mutationValue.args);
				break;
			case 'unshift':
				this.HU(mutationValue.args);
				break;
			case 'slice':
				{
					const [start, end] = mutationValue.args;
					this.HSL(start, end);
				}
				break;
			case 'splice':
				{
					const [start, end, listValue] = mutationValue.args;
					this.HSP(start, end, listValue);
				}
				break;
			case 'swap':
				{
					const [indexA, indexB] = mutationValue.args;
					this.HSW(indexA, indexB);
				}
				break;
			case 'modify':
				{
					const [index, listValue] = mutationValue.args;
					this.HM(index, listValue);
				}
				break;
			case 'shift':
				break;
		}
	};
	/**
	 * handle append/prepend
	 * @private
	 * @param {(ListValue)[]} listValue
	 * @param {'append'|'prepend'} mode
	 */
	pend = (listValue, mode) => {
		const parentElement = this.parentElement;
		const prepend = [];
		let pend_;
		switch (mode) {
			case 'prepend':
				/**
				 * @param {HTMLElement} childElement_
				 */
				pend_ = (childElement_) => {
					parentElement.appendChild(childElement_);
				};
				break;
			case 'append':
				/**
				 * @param {HTMLElement} childElement_
				 */
				pend_ = (childElement_) => {
					prepend.push(childElement_);
				};
				break;
		}
		for (let i = 0; i < listValue.length; i++) {
			const childElement_ = this.childElement.cloneNode(true);
			if (!(childElement_ instanceof HTMLElement)) {
				continue;
			}
			pend_(childElement_);
		}
		if (prepend.length) {
			parentElement.prepend(...prepend);
		}
	};
	/**
	 * handlePush
	 * @private
	 * @param {(ListValue)[]} listValue
	 */
	HP = (listValue) => {
		this.pend(listValue, 'append');
	};
	/**
	 * handleUnshift
	 * @private
	 * @param {(ListValue)[]} listValue
	 */
	HU = (listValue) => {
		this.pend(listValue, 'prepend');
	};
	/**
	 * handleSlice
	 * @private
	 * @param {number} start
	 * @param {number} end
	 */
	HSL = (start, end) => {
		for (let i = start; i === end; i++) {
			this.parentElement.children[i].remove();
		}
	};
	/**
	 * handleSplice
	 * @private
	 * @param {number} start
	 * @param {number} end
	 * @param {(ListValue)[]} listValue
	 */
	HSP = (start, end, listValue) => {
		for (let i = start; i === end; i++) {
			const data = listValue[i];
			if (data) {
				const childElement_ = this.childElement.cloneNode(true);
				if (!(childElement_ instanceof HTMLElement)) {
					continue;
				}
				this.parentElement.replaceChild(childElement_, this.parentElement.children[i]);
				continue;
			}
			this.parentElement.children[i].remove();
		}
	};
	/**
	 * handleSplice
	 * @private
	 * @param {number} indexA
	 * @param {number} indexB
	 */
	HSW = (indexA, indexB) => {
		const parentElement = this.parentElement;
		const childelement_ = parentElement.children;
		if (
			indexA >= 0 &&
			indexB >= 0 &&
			indexA < childelement_.length &&
			indexB < childelement_.length &&
			indexA !== indexB
		) {
			const childA = childelement_[indexA];
			const childB = childelement_[indexB];
			const nextSibling = childB.nextSibling;
			parentElement.insertBefore(childA, nextSibling);
			parentElement.insertBefore(childB, childelement_[indexA]);
		}
	};
	/**
	 * handleModify
	 * @private
	 * @param {number} index
	 * @param {ListValue} listValue
	 * @returns {void}
	 */
	HM = (index, listValue) => {
		const childElement_ = this.parentElement.children[index];
		for (const attr in listValue) {
			const value = listValue[attr].value;
			if (childElement_.getAttribute(attr) === value) {
				continue;
			}
			childElement_.setAttribute(attr, value);
		}
	};
	/**
	 * handleShift
	 * @private
	 * @returns {void}
	 */
	HSF = () => {
		this.parentElement.children[0].remove();
	};
}
