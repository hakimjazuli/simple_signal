// @ts-check

import { $ } from './$.mjs';
import { functions } from './functions.mjs';
import { handlePromiseAll } from './handlePromiseAll.mjs';
import { helper } from './helper.mjs';
import { mutaitonObserver } from './mutaitonObserver.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
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
	CDS;
	disconnect = () => {
		if (this.$) {
			this.mLet.remove$(this.$);
		}
		const documentScope = this.CDS;
		if (documentScope !== document) {
			this.mObs.disconnect();
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
	mLet;
	/**
	 * @private
	 * @type {MutationObserver}
	 */
	mObs;
	/**
	 * @private
	 * @type {$}
	 */
	$;
	/**
	 * @param {attributeLifecyclesHandler} attributeLifecyclesHandler
	 * @param {documentScope} documentScope
	 */
	constructor(attributeLifecyclesHandler, documentScope = document) {
		this.AL = attributeLifecyclesHandler;
		this.CDS = documentScope;
		const [mObs, mLet] = mutaitonObserver.create(documentScope);
		this.mObs = mObs;
		this.mLet = mLet;
		this.takeRecords = mObs.takeRecords;
		const registeredAttribute = this.IRM();
		switch (registeredAttribute) {
			case 'whole':
				this.$ = new $(async (first) => {
					const mutationList = mLet.value;
					if (first) {
						await this.I();
						return;
					}
					await this.CE(mutationList);
				});
				break;
			case 'partial':
				new Ping(true, async () => {
					await this.I();
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
	 * isRegisteredMap
	 * @private
	 * @return {"partial"|"whole"|string}
	 */
	IRM = () => {
		const attributeLifecyclesHandler = this.AL;
		const documentScope = this.CDS;
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
	 * initiator
	 * @private
	 * @returns {Promise<void>}
	 */
	I = async () => {
		const attributeLifecyclesHandler = this.AL;
		const documentScope = this.CDS;
		for (const attributeName in attributeLifecyclesHandler) {
			const validAttributeName = functions.VAS(attributeName);
			const elements = documentScope.querySelectorAll(`[${validAttributeName}]`);
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				if (!(element instanceof HTMLElement)) {
					continue;
				}
				await this.ANH(element, attributeName);
			}
		}
	};
	/**
	 * elementConnectedRefed
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	elementCMRefed = [];
	/**
	 * addedNodeHanlder
	 * @private
	 * @param {Node} addedNode
	 * @param {string} attributeName
	 */
	ANH = async (addedNode, attributeName) => {
		if (
			addedNode[helper.SC] !== this.CDS ||
			!(addedNode instanceof HTMLElement) ||
			!addedNode.hasAttribute(attributeName)
		) {
			return;
		}
		this.AL[attributeName]({
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
		await this.callCB();
	};
	/**
	 * callConnectedCallback
	 * @private
	 */
	callCB = async () => {
		/**
		 * already `autoQueued` using `$` in `this.$`
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
	 * @private
	 * @param {MutationRecord[]} mutationList
	 */
	CE = async (mutationList) => {
		const attributesLifecycle = Lifecycle.ID.get(this.CDS);
		for (let i = 0; i < mutationList.length; i++) {
			const mutation = mutationList[i];
			if (mutation.addedNodes) {
				for (let j = 0; j < mutation.addedNodes.length; j++) {
					const addedNode = mutation.addedNodes[j];
					for (const attributeName in attributesLifecycle) {
						await this.ANH(addedNode, attributeName);
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
}
