// @ts-check

import { helper } from './helper.mjs';

/**
 * @description
 * `App` starter helper for module environtment;
 * the sole purpose is just to auto import the necessary file in your main js file;
 */
export class App {
	/**
	 * @type {App}
	 */
	static __;
	/**
	 * @param {Object} options
	 * @param {import('./Component.mjs').Component} [options.rootComponents] -
	 * - for efficiency, only fill this option when you intent to use the library as sole `View` part of your stack;
	 * - the inputed root component must manually fills attributeName option argument, to target root element on the real dom;
	 * @param {(import("./Lifecycle.mjs").Lifecycle)[]} [options.lifecycles]
	 * @param {(import("./For.mjs").For)[]} [options.forS]
	 * @param {import('./DefineShortCuts.mjs').DefineShortCuts} [options.definedShortcuts]
	 * @param {import('./DefineQRouter.mjs').DefineQRouter} [options.definedQRouter]
	 * @param {import('./DefineStorage.mjs').DefineStorage} [options.definedStorage]
	 */
	constructor({
		lifecycles,
		forS,
		rootComponents,
		definedShortcuts,
		definedQRouter,
		definedStorage,
	}) {
		if (App.__ instanceof App) {
			helper.warningSingleton(App);
			return;
		}
		App.__ = this;
	}
}
