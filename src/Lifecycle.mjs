// @ts-check

import { $ } from './$.mjs';
import { functions } from './functions.mjs';
import { handlePromiseAll } from './handlePromiseAll.mjs';
import { helper } from './helper.mjs';
import { mainMutaitonObserver } from './mainMutaitonObserver.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * helper class to track connected and disconnected of an element, with attribute selector;
 * ```js
 * new Lifecycle({
 * [attributeName]: async(options)=>{
 *				// command;
 *			}
 *		},
 *		// [documentScope]
 *	)
 * ```
 */
export class Lifecycle {
	/**
	 * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
	 * @typedef {import('./Let.mjs').Let<MutationRecord[]>} LetMutationRecords
	 */
	/**
	 * registered effect
	 * @private
	 * @type {$}
	 */
	$;
	/**
	 * @typedef {{
	 * [attributeName:string]:
	 * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>Promise<void>
	 * }} attributeLifecyclesHandler
	 */
	/**
	 * @private
	 * @type {attributeLifecyclesHandler}
	 */
	AL;
	/**
	 * document scope
	 * @private
	 * @type {documentScope}
	 */
	DS;
	/**
	 * lifecycleIdentification
	 * @private
	 * @type {string[]}
	 */
	static ID = [];
	/**
	 * observer
	 * @private
	 * @type {MutationObserver}
	 */
	O;
	/**
	 * @private
	 * @type {LetMutationRecords}
	 */
	ML;
	/**
	 * elementConnectedRefed
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	elementCMRefed = [];
	/**
	 * @param {attributeLifecyclesHandler} attrLifecycleCallback
	 * @param {documentScope} [documentScope]
	 */
	constructor(attrLifecycleCallback, documentScope = document) {
		this.AL = attrLifecycleCallback;
		this.DS = documentScope;
		if (documentScope === document) {
			if (!(mainMutaitonObserver.__ instanceof mainMutaitonObserver)) {
				new mainMutaitonObserver();
			}
			// @ts-ignore
			this.O = mainMutaitonObserver.__.documentObserver;
			// @ts-ignore
			this.ML = mainMutaitonObserver.__.documentMutations_;
		} else {
			/**
			 * @type {LetMutationRecords}
			 */
			// @ts-ignore
			this.ML = new Let('');
			this.O = new MutationObserver((mutationList) => {
				this.ML.value = mutationList;
			});
			this.O.observe(documentScope, {
				childList: true,
				subtree: true,
			});
		}
		this.takeRecord = this.O.takeRecords;
		this.$ = new $(async (first) => {
			const value = this.ML.value;
			if (first) {
				await this.I();
				return;
			}
			await this.CE(value);
		});
	}
	/**
	 * @type {()=>MutationRecord[]}
	 */
	takeRecord;
	/**
	 * initiator
	 * @private
	 */
	I = async () => {
		for (const attributeName in this.AL) {
			if (Lifecycle.ID.includes(attributeName)) {
				console.error({
					message: `${attributeName} is already registered on "Lifecycle" observer`,
					solution: `use different "attributeName" other than [${Lifecycle.ID.join(
						', '
					)}], prefixing it with descriptive abbreviation is strongly recommended;`,
				});
				continue;
			}
			const elements = this.DS.querySelectorAll(`[${functions.VAS(attributeName)}]`);
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				await this.ANC(element, attributeName);
			}
		}
	};
	/**
	 * check element
	 * @private
	 * @param {MutationRecord[]} mutationList
	 */
	CE = async (mutationList) => {
		for (let i = 0; i < mutationList.length; i++) {
			const mutation = mutationList[i];
			if (mutation.addedNodes) {
				for (let j = 0; j < mutation.addedNodes.length; j++) {
					const addedNode = mutation.addedNodes[j];
					for (const attributeName in this.AL) {
						await this.ANC(addedNode, attributeName);
					}
				}
				await this.callCB();
			}
			if (mutation.removedNodes) {
				for (let j = 0; j < mutation.removedNodes.length; j++) {
					const removedNode = mutation.removedNodes[j];
					if (!(removedNode instanceof HTMLElement)) {
						continue;
					}
					await this.CMDC(removedNode);
				}
			}
			if (mutation.type !== 'attributes') {
				continue;
			}
			const target = mutation.target;
			if (target instanceof HTMLElement && mutation.attributeName) {
				this.callACCB(target, mutation.attributeName);
			}
		}
	};
	/**
	 * addedNodeCheck
	 * @private
	 * @param {Node} addedNode
	 * @param {string} attributeName
	 */
	ANC = async (addedNode, attributeName) => {
		if (!(addedNode instanceof HTMLElement)) {
			return;
		}
		if (!addedNode.hasAttribute(attributeName)) {
			return;
		}
		await this.AL[attributeName]({
			element: addedNode,
			lifecycleObserver: this,
			onConnected: (connectedCallback) => {
				const index = this.elementCMRefed.push(connectedCallback);
				const currentIndex = index - 1;
				this.elementCMRefed[currentIndex] = async () => {
					this.elementCMRefed.splice(currentIndex, 1);
					await connectedCallback();
				};
			},
			onDisconnected: (disconnectedCallback) => {
				Lifecycle.setDCCB(addedNode, disconnectedCallback);
			},
			onAttributeChanged: (attributeChangedCallback) => {
				Lifecycle.setACCB(addedNode, attributeChangedCallback);
			},
		});
	};
	/**
	 * callConnectedCallback
	 * @private
	 */
	callCB = async () => {
		/**
		 * alrady `autoQueued` using `$` in `this.$`
		 */
		await handlePromiseAll(this.elementCMRefed);
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {()=>Promise<void>} disconnectedCallback
	 * @returns {void}
	 */
	static setDCCB = (element, disconnectedCallback) => {
		if (!(helper.DCCBI in element)) {
			element[helper.DCCBI] = [];
		}
		element[helper.DCCBI].push(disconnectedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|(()=>Promise<void>)[]}
	 */
	static getDCCB = (element) => {
		if (!(helper.DCCBI in element)) {
			return;
		}
		return element[helper.DCCBI];
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
	 * @returns {void}
	 */
	static setACCB = (element, attributeChangedCallback) => {
		element[helper.ACCBI] = attributeChangedCallback;
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|import('./lifecycleHandler.type.mjs').attributeChangedLifecycle}
	 */
	static getACCB = (element) => {
		if (!(helper.ACCBI in element)) {
			return;
		}
		return element[helper.ACCBI];
	};

	/**
	 * call attributeConnectedCallback
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {string} attributeName
	 */
	callACCB = async (element, attributeName) => {
		const attributeChangedCallback_ = Lifecycle.getACCB(element);
		if (!attributeChangedCallback_) {
			return;
		}
		await attributeChangedCallback_({
			attributeName,
			newValue: element.getAttribute(attributeName) ?? '',
		});
	};
	/**
	 * find deeply nested attribute name
	 * @private
	 * @param {HTMLElement|Element} node
	 * @param {string} attributeName
	 * @param {Node[]} found
	 * @returns {Node[]}
	 */
	static FDN = (node, attributeName, found = []) => {
		if (node.hasAttribute && node.hasAttribute(attributeName)) {
			found.push(node);
		}
		for (let i = 0; i < node.children.length; i++) {
			Lifecycle.FDN(node.children[i], attributeName, found);
		}
		return found;
	};
	/**
	 * find deeply nested registered Disconecceted callbacks
	 * @private
	 * @param {HTMLElement|Element} node
	 * @param {(Node)[]} found
	 * @returns {(Node)[]}
	 */
	static FDNDCR = (node, found = []) => {
		if (Lifecycle.getDCCB(node)) {
			found.push(node);
		}
		for (let i = 0; i < node.children.length; i++) {
			Lifecycle.FDNDCR(node.children[i], found);
		}
		return found;
	};
	/**
	 * check mutation disconnected
	 * @private
	 * @param {HTMLElement}removedNode
	 */
	CMDC = async (removedNode) => {
		const elements = Lifecycle.FDNDCR(removedNode);
		const disconnectedCallbacks = [];
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			if (!(element instanceof HTMLElement)) {
				continue;
			}
			const disconnectCallback = Lifecycle.getDCCB(element);
			if (disconnectCallback) {
				disconnectedCallbacks.push(...disconnectCallback);
			}
		}
		await handlePromiseAll(disconnectedCallbacks);
	};
	/**
	 * @public
	 */
	disconnect = () => {
		new Ping(true, async () => {
			this.ML.remove$(this.$);
			if (this.DS === document) {
				return;
			}
			this.O.disconnect();
		});
	};
}
