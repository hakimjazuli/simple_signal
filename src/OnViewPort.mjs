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
	 * @private
	 * @type {Lifecycle}
	 */
	lifecycleObserver;
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
					element[helper.onViewCBIdentifier] = attributeHandler[attributeName].onViewPort;
					element[helper.onExitViewCBIdentifier] =
						attributeHandler[attributeName].onExitingViewPort;
					this.observer.observe(element);
				});
				onDisconnected(async () => {
					await attributeHandler[attributeName].onDisconnected(
						this.disconnectedTypeParam(element)
					);
				});
			};
		}
		this.lifecycleObserver = new Lifecycle(intersectionLifecycle, documentScope);
	}
	/**
	 * @private
	 */
	observer = new IntersectionObserver(
		(entries) => {
			new Ping(true, async () => {
				for (let i = 0; i < entries.length; i++) {
					await this.handleEntry(entries[i]);
				}
			});
		},
		{ threshold: [0, 0] }
	);
	/**
	 * @returns {IntersectionObserverEntry[]}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
	 */
	takeRecords = () => this.observer.takeRecords();
	/**
	 * @returns {void}
	 * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
	 */
	disconnect = () => this.observer.disconnect();
	root = this.observer.root;
	rootMargin = this.observer.rootMargin;
	/**
	 * @param {Element|HTMLElement} element
	 * @returns
	 */
	unobserve = (element) => this.observer.unobserve(element);
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @return {import('./onViewPortHandler.type.mjs').onViewPortHandlerDisconnector}
	 */
	disconnectedTypeParam = (element) => {
		return {
			element,
			onViewPortObserver: this,
			lifecycleObserver: this.lifecycleObserver,
		};
	};
	/**
	 * @private
	 * @param {IntersectionObserverEntry} entry
	 */
	handleEntry = async (entry) => {
		const element = entry.target;
		if (
			entry.isIntersecting &&
			helper.onViewCBIdentifier in element &&
			!element.hasAttribute(helper.onExitViewCBIdentifier)
		) {
			element.setAttribute(helper.onExitViewCBIdentifier, '');
			await element[helper.onViewCBIdentifier](this.disconnectedTypeParam(element));
		} else if (
			element.hasAttribute(helper.onExitViewCBIdentifier) &&
			helper.onExitViewCBIdentifier in element
		) {
			element[helper.onExitViewCBIdentifier](this.disconnectedTypeParam(element));
		}
	};
}
