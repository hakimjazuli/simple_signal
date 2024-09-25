// @ts-check

import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * lifecycle wrapper to observe whether element is in viewport
 */

export class OnViewPort {
	/**
	 * lifecycle observer
	 * @private
	 * @type {Lifecycle}
	 */
	LO;
	/**
	 * @private
	 * @type {onViewPortatributesHandler}
	 */
	attrbuteHandler;
	/**
	 *  * @typedef {{
	 * [attributeName:string]:
	 * import('./onViewPortHandler.type.mjs').onViewPortHandler
	 * }} onViewPortatributesHandler
	 */
	/**
	 * @param {onViewPortatributesHandler} attributeHandler
	 * undefined: will automatically fires unObserve callback;
	 * @param {import('./documentScope.type.mjs').documentScope} documentScope
	 */
	constructor(attributeHandler, documentScope = document) {
		this.attrbuteHandler = attributeHandler;
		/**
		 * @type {{[attributeName:string]:
		 * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>Promise<void>}}
		 */
		let intersectionLifecycle = {};
		for (const attributeName in attributeHandler) {
			/**
			 * @param {import('./lifecycleHandler.type.mjs').lifecycleHandler} arg0
			 */
			intersectionLifecycle[attributeName] = async ({
				element,
				onConnected,
				onDisconnected,
			}) => {
				onConnected(async () => {
					element[helper.VCBI] = attributeHandler[attributeName].onViewPort;
					element[helper.XVCBI] = attributeHandler[attributeName].onExitingViewPort;
					this.O.observe(element);
				});
				onDisconnected(async () => {
					await attributeHandler[attributeName].onDisconnected(this.DCP(element));
				});
			};
		}
		this.LO = new Lifecycle(intersectionLifecycle, documentScope);
	}
	/**
	 * @private
	 */
	O = new IntersectionObserver(
		(entries) => {
			new Ping(true, async () => {
				for (let i = 0; i < entries.length; i++) {
					await this.HE(entries[i]);
				}
			});
		},
		{ threshold: [0, 0] }
	);
	/**
	 * @returns {IntersectionObserverEntry[]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
	 */
	takeRecords = () => this.O.takeRecords();
	/**
	 * @returns {void}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
	 */
	disconnect = () => this.O.disconnect();
	root = this.O.root;
	rootMargin = this.O.rootMargin;
	/**
	 * @param {Element|HTMLElement} element
	 * @returns
	 */
	unobserve = (element) => this.O.unobserve(element);
	/**
	 * disconnectedTypeParam
	 * @private
	 * @param {HTMLElement|Element} element
	 * @return {import('./onViewPortHandler.type.mjs').onViewPortHandlerDisconnector}
	 */
	DCP = (element) => {
		return {
			element,
			onViewPortObserver: this,
			lifecycleObserver: this.LO,
		};
	};
	/**
	 * handleEntry
	 * @private
	 * @param {IntersectionObserverEntry} entry
	 */
	HE = async (entry) => {
		const element = entry.target;
		if (entry.isIntersecting && helper.VCBI in element && !element.hasAttribute(helper.XVCBI)) {
			element.setAttribute(helper.XVCBI, '');
			await element[helper.VCBI](this.DCP(element));
		} else if (element.hasAttribute(helper.XVCBI) && helper.XVCBI in element) {
			element[helper.XVCBI](this.DCP(element));
		}
	};
}
