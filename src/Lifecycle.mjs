// @ts-check

import { $ } from './$.mjs';
import { handlePromiseAll } from './handlePromiseAll.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';
import { mainMutaitonObserver } from './MainMutaitonObserver.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

export class Lifecycle {
	/**
	 * registered effect
	 * @private
	 * @type {$}
	 */
	$;
	/**
	 * attributes lifecycle callbacks
	 * @private
	 * @type {{
	 * [attributeName:string]:
	 * (element:HTMLElement|Element, unObserve:()=>void)=>(Promise<()=>Promise<void>>)
	 * }}
	 */
	AL;
	/**
	 * document scope
	 * @private
	 * @type {import('./documentScope.type.mjs').documentScope}
	 */
	DS;
	/**
	 * @private
	 * @type {MutationObserver}
	 */
	O;
	/**
	 * @private
	 * @type {Let<MutationRecord[]>}
	 */
	ML;
	/**
	 * @param {{
	 * [attributeName:string]:
	 * (element:HTMLElement|Element, unObserve:()=>void)=>(Promise<()=>Promise<void>>)
	 * }} attrLifecycleCallback
	 * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
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
			this.ML = mainMutaitonObserver.__.documentMutation_;
		} else {
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
		this.$ = new $(async () => {
			this.ML.value;
			await this.CE();
		});
	}
	/**
	 * disconnected callbacks
	 * @private
	 * @type {{
	 * [attributeName:string]: ()=>Promise<void>
	 * }}
	 */
	DC = {};
	/**
	 * @private
	 */
	CE = async () => {
		for (const attributeName in this.AL) {
			const lifecycle = this.AL[attributeName];
			const elements = this.DS.querySelectorAll(`[${attributeName}]`);
			const batch = [];
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				if (!element.hasAttribute(helper.LC)) {
					element.setAttribute(helper.LC, '');
					const attributeIdentifier = `${attributeName}="${
						element.getAttribute(attributeName) ?? ''
					}"`;
					this.DC[attributeIdentifier] = await lifecycle(element, this.unObserve);
				}
			}
		}
		for (const attributeSelector in this.DC) {
			const disconnectedCallback = this.DC[attributeSelector];
			if (!this.DS.querySelector(`[${attributeSelector}]`)) {
				await disconnectedCallback();
				delete this.DC[attributeSelector];
				if (Object.keys(this.DC).length === 0) {
					this.ML.remove$(this.$);
				}
			}
		}
	};
	unObserve = () => {
		helper.QH.A(
			new queueObjectFIFO(async () => {
				if (this.DC) {
					let DCS = [];
					for (const attributeIdentifier in this.DC) {
						DCS.push(this.DC[attributeIdentifier]);
					}
					await handlePromiseAll(DCS);
					this.DC = {};
				}
				this.ML.remove$(this.$);
				if (this.DS === document) {
					return;
				}
				this.O.disconnect();
			}, helper.D)
		);
	};
}
