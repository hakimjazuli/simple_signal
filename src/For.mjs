// @ts-check

import { $ } from './$.mjs';
import { Derived } from './Derived.mjs';
import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - assign element to loop through ['List'](#list) as data to render child element using class instantiation;
 * - loped childElement:
 * > - must have `HTMLElement` as first children;
 * > - only first children will be used to loop through `List`, all other children will be deleted from the dom before `onConnected` event of parentElement;
 */
export class For {
	/**
	 * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
	 * @typedef {import('./List.mjs').ListArg} ListArg
	 * @typedef {Object} childLifeCycleCallback
	 * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onConnected
	 * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onDisconnected
	 * @property {(arg0:{childElement:HTMLElement,ForController:For,attributeName:string, newValue:string})=>Promise<void>} childLifeCycleCallback.onAttributeChanged
	 */
	/**
	 * @param {import('./List.mjs').List} listInstance
	 * @param {string} attributeName
	 * - parent attributeName
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {import('./documentScope.type.mjs').documentScope} documentScope
	 */
	constructor(listInstance, attributeName, childLifeCycleCallback, documentScope = document) {
		this.listInstance = listInstance;
		this.attr = attributeName;
		this.DS = documentScope;
		new Lifecycle(
			{
				[attributeName]: async ({ element, onConnected, onDisconnected }) => {
					onConnected(async () => {
						const effect = new $(async () => {
							await this.handleMutationList(listInstance.mutation.value);
						});
						onDisconnected(async () => {
							listInstance.mutation.remove$(effect);
						});
						this.onParentConnected(element, childLifeCycleCallback, onDisconnected);
					});
				},
			},
			documentScope
		);
	}
	/**
	 * @private
	 * @param {HTMLElement} parentElement
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	onParentConnected = (parentElement, childLifeCycleCallback, onParentDisconnected) => {
		this.parentElement = parentElement;
		this.childElement = parentElement.children[0];
		if (!this.childElement) {
			console.error({
				parentElement: this.parentElement,
				childElement: this.childElement,
				message: 'no `childElement` in the `parentElement`',
				solution: 'create `HTMLElement` as children[0] of `parentElement`',
			});
			return;
		}
		/**
		 * @type {import('./List.mjs').ListValue[]}
		 */
		const listValue = this.listInstance.proxyInstance.value;
		this.childElement.setAttribute(`${helper.ForChildAttributePrefix}${this.attr}`, '');
		parentElement.innerHTML = '';
		this.childLifecycle(childLifeCycleCallback, onParentDisconnected);
		for (let i = 0; i < listValue.length; i++) {
			const childElement_ = this.childElement.cloneNode(true);
			if (!(childElement_ instanceof HTMLElement)) {
				continue;
			}
			parentElement.appendChild(childElement_);
		}
	};
	/**
	 * @private
	 * @param {childLifeCycleCallback} childLifeCycleCallback
	 * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
	 */
	childLifecycle = (childLifeCycleCallback, onParentDisconnected) => {
		const childLifecycle = new Lifecycle(
			{
				[`${helper.ForChildAttributePrefix}${this.attr}`]: async ({
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
						await childLifeCycleCallback.onConnected({
							childElement,
							ForController: this,
						});
						const index = this.getChildElementIndex(childElement);
						/**
						 * @type {import('./List.mjs').ListValue}
						 */
						const data = this.listInstance.proxyInstance.value[index];
						/**
						 * @type {{[dataName:string]:Derived<string>}}
						 */
						// @ts-ignore
						const derived = {};
						for (const dataName in data) {
							derived[dataName] = new Derived(
								async () => data[dataName].value,
								dataName,
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
	 * @private
	 * @param {HTMLElement} childElement
	 * @returns {number}
	 */
	getChildElementIndex(childElement) {
		const parentElement = this.parentElement;
		const children = Array.from(parentElement.children);
		return children.indexOf(childElement);
	}
	/**
	 * @type {string}
	 */
	attr;
	/**
	 * @private
	 * @param {import('./List.mjs').mutationType} mutationValue
	 * @returns {Promise<void>}
	 */
	handleMutationList = async (mutationValue) => {
		switch (mutationValue.type) {
			case '':
				/**
				 * do nothing at initial auto subscribe
				 */
				return;
			case 'push':
				this.handlePush(mutationValue.args);
				break;
			case 'unshift':
				this.handleUnshift(mutationValue.args);
				break;
			case 'slice':
				{
					const [start, end] = mutationValue.args;
					this.handleSlice(start, end);
				}
				break;
			case 'splice':
				{
					const [start, end] = mutationValue.args;
					this.handleSplice(start, end);
				}
				break;
			case 'swap':
				{
					const [indexA, indexB] = mutationValue.args;
					this.handleSwap(indexA, indexB);
				}
				break;
			case 'modify':
				{
					const [index, listValue] = mutationValue.args;
					this.handleModify(index, listValue);
				}
				break;
			case 'shift':
				this.handleShift();
				break;
		}
	};
	/**
	 * handle append/prepend
	 * @private
	 * @param {(ListArg)[]} listValue
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
	 * @private
	 * @param {(ListArg)[]} listValue
	 */
	handlePush = (listValue) => {
		this.pend(listValue, 'append');
	};
	/**
	 * @private
	 * @param {(ListArg)[]} listValue
	 */
	handleUnshift = (listValue) => {
		this.pend(listValue, 'prepend');
	};
	/**
	 * @private
	 * @param {number} start
	 * @param {number} end
	 */
	handleSlice = (start, end) => {
		for (let i = start; i < end; i++) {
			this.parentElement.children[i].remove();
		}
	};
	/**
	 * @private
	 * @param {number} start
	 * @param {number} end
	 */
	handleSplice = (start, end) => {
		this.handleSlice(start, end);
		const parentElement = this.parentElement;
		const children = parentElement.children;
		for (let j = start; j < children.length; j++) {
			const child = children[j];
			if (child) {
				parentElement.insertBefore(this.childElement.cloneNode(true), child);
			} else {
				const childElement_ = this.childElement.cloneNode();
				this.parentElement.append(childElement_);
			}
		}
	};
	/**
	 * @private
	 * @param {number} indexA
	 * @param {number} indexB
	 */
	handleSwap = (indexA, indexB) => {
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
	 * @private
	 * @param {number} index
	 * @param {import('./List.mjs').ListValue} listValue
	 * @returns {void}
	 */
	handleModify = (index, listValue) => {
		const childElement_ = this.parentElement.children[index];
		for (const attr in listValue) {
			const value = listValue[attr].value;
			childElement_.setAttribute(attr, value);
		}
	};
	/**
	 * @private
	 * @returns {void}
	 */
	handleShift = () => {
		this.parentElement.children[0].remove();
	};
}
