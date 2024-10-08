// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { mutaitonObserver } from './mutaitonObserver.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 * - all global `signal` with dom relector that need to be available for `parent scope` should be prefixed with `g-`;
 */
export class Lifecycle {
	/**
	 * @typedef {{
	 * [attributeName:string]:
	 * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void
	 * }} attributeLifecyclesHandler
	 * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
	 */
	/**
	 * attributeIdentification
	 * @private
	 * @type {Map<documentScope,attributeLifecyclesHandler>}
	 */
	static ID = new Map();
	/**
	 * currentDocumentScope
	 * @private
	 * @type {documentScope}
	 */
	currentDocumentScope;
	disconnect = () => {
		if (this.effect) {
			this.mutationSignal.remove$(this.effect);
		}
		const documentScope = this.currentDocumentScope;
		if (documentScope !== document) {
			this.mutationObserver.disconnect();
			Lifecycle.ID.delete(documentScope);
		}
	};
	/**
	 * @type {() => MutationRecord[]}
	 */
	takeRecords;
	/**
	 * @private
	 * @type {import('./Let.mjs').Let<MutationRecord[]>}
	 */
	mutationSignal;
	/**
	 * @private
	 * @type {MutationObserver}
	 */
	mutationObserver;
	/**
	 * @private
	 * @type {$}
	 */
	effect;
	/**
	 * @private
	 * @type {attributeLifecyclesHandler}
	 */
	attributeLifecyclesHandler;
	/**
	 * @param {attributeLifecyclesHandler} attributeLifecyclesHandler
	 * @param {documentScope} documentScope
	 */
	constructor(attributeLifecyclesHandler, documentScope = document) {
		this.attributeLifecyclesHandler = attributeLifecyclesHandler;
		this.currentDocumentScope = documentScope;
		const [mObs, mLet] = mutaitonObserver.create(documentScope);
		this.mutationObserver = mObs;
		this.mutationSignal = mLet;
		this.takeRecords = mObs.takeRecords;
		const registeredAttribute = this.isRegisteredMap();
		switch (registeredAttribute) {
			/**
			 * uses `switch case` over `guard clause` in case of source update that requires additional
			 * check that are making it not possible for early returns
			 */
			case 'whole':
				this.effect = new $(async (first) => {
					const mutationList = mLet.value;
					if (first) {
						await this.initiator();
						return;
					}
					await this.mutationHandler(mutationList);
				});
				break;
			case 'partial':
				new Ping(true, async () => {
					await this.initiator();
				});
				break;
			default:
				console.error({
					documentScope,
					message: `'${registeredAttribute}' already registered in this 'documentScope'`,
					registeredAttributes: Object.keys(Lifecycle.ID.get(documentScope)),
				});
				break;
		}
	}
	/**
	 * @private
	 * @return {"partial"|"whole"|string}
	 */
	isRegisteredMap = () => {
		const attributeLifecyclesHandler = this.attributeLifecyclesHandler;
		const documentScope = this.currentDocumentScope;
		if (!Lifecycle.ID.has(documentScope)) {
			Lifecycle.ID.set(documentScope, attributeLifecyclesHandler);
			return 'whole';
		}
		const scopedAttribute = Lifecycle.ID.get(documentScope);
		for (const attributeName in attributeLifecyclesHandler) {
			if (!(attributeName in scopedAttribute)) {
				scopedAttribute[attributeName] = attributeLifecyclesHandler[attributeName];
				continue;
			}
			return attributeName;
		}
		return 'partial';
	};
	/**
	 * @private
	 * @returns {Promise<void>}
	 */
	initiator = async () => {
		const attributeLifecyclesHandler = this.attributeLifecyclesHandler;
		const documentScope = this.currentDocumentScope;
		for (const attributeName in attributeLifecyclesHandler) {
			const validAttributeSelector = helper.validAttributeNameSelector(attributeName);
			const elements = documentScope.querySelectorAll(`[${validAttributeSelector}]`);
			for (let i = 0; i < elements.length; i++) {
				await this.addedNodeHandler(elements[i], attributeName);
			}
		}
		await this.callConnectedCallback();
	};
	/**
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	elementCMRefed = [];
	/**
	 * @private
	 * @param {documentScope} node
	 * @returns {boolean}
	 */
	checkValidScoping = (node) => {
		const documentScope = this.currentDocumentScope;
		while (node) {
			if (!Lifecycle.ID.has(node)) {
				node = node.parentElement;
				continue;
			}
			if (node !== documentScope) {
				return false;
			}
			return true;
		}
		return true;
	};
	/**
	 * @private
	 * @param {Node} addedNode
	 * @param {string} attributeName
	 */
	addedNodeHandler = async (addedNode, attributeName) => {
		if (
			!((addedNode instanceof HTMLElement) /** to eliminate repeatition on ANH call */) ||
			!addedNode.hasAttribute(attributeName /** primary criteria */) ||
			(!attributeName.startsWith(helper.globalSignalPrefix) &&
				!this.checkValidScoping(addedNode))
		) {
			return;
		}
		this.attributeLifecyclesHandler[attributeName]({
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
	 * @private
	 */
	callConnectedCallback = async () => {
		/**
		 * already `autoQueued` using `$` in `this.$`
		 */
		await helper.handlePromiseAll(this.elementCMRefed);
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {()=>Promise<void>} disconnectedCallback
	 * @returns {void}
	 */
	static setDCCB = (element, disconnectedCallback) => {
		if (!(helper.DCCBIdentifier in element)) {
			element[helper.DCCBIdentifier] = [];
		}
		element[helper.DCCBIdentifier].push(disconnectedCallback);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|(()=>Promise<void>)[]}
	 */
	static getDCCB = (element) => {
		if (!(helper.DCCBIdentifier in element)) {
			return;
		}
		return element[helper.DCCBIdentifier];
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
	 * @returns {void}
	 */
	static setACCB = (element, attributeChangedCallback) => {
		element[helper.ACCBIdentifier] = attributeChangedCallback;
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @returns {void|import('./lifecycleHandler.type.mjs').attributeChangedLifecycle}
	 */
	static getACCB = (element) => {
		if (!(helper.ACCBIdentifier in element)) {
			return;
		}
		return element[helper.ACCBIdentifier];
	};

	/**
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
	 * @private
	 * @param {MutationRecord[]} mutationList
	 */
	mutationHandler = async (mutationList) => {
		const attributesLifecycle = Lifecycle.ID.get(this.currentDocumentScope);
		for (let i = 0; i < mutationList.length; i++) {
			const mutation = mutationList[i];
			if (mutation.addedNodes) {
				for (let j = 0; j < mutation.addedNodes.length; j++) {
					const addedNode = mutation.addedNodes[j];
					for (const attributeName in attributesLifecycle) {
						await this.addedNodeHandler(addedNode, attributeName);
					}
				}
				await this.callConnectedCallback();
			}
			if (mutation.removedNodes) {
				for (let j = 0; j < mutation.removedNodes.length; j++) {
					const removedNode = mutation.removedNodes[j];
					if (!(removedNode instanceof HTMLElement)) {
						continue;
					}
					await this.mutationDCHandler(removedNode);
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
	 * @private
	 * @param {HTMLElement}removedNode
	 */
	mutationDCHandler = async (removedNode) => {
		const elements = Lifecycle.findDeepNested(removedNode);
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
		if (disconnectedCallbacks.length) {
			await helper.handlePromiseAll(disconnectedCallbacks);
		}
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} node
	 * @param {(Node)[]} found
	 * @returns {(Node)[]}
	 */
	static findDeepNested = (node, found = []) => {
		if (Lifecycle.getDCCB(node)) {
			found.push(node);
		}
		for (let i = 0; i < node.children.length; i++) {
			Lifecycle.findDeepNested(node.children[i], found);
		}
		return found;
	};
}
