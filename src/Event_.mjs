// @ts-check

import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * use this instead of normal `eventListener` declaration for:
 * - creating `autoqueued` `listener`;
 * - `autoScope` `_` static methods, inside `Component` scope;
 * ```js
 * // @ts-check
 * someObject.addEventListener('click', Event_.listener( (event) => {
 * // code
 * }))
 * ```
 */
export class Event_ {
	/**
	 * @param {(event:Event)=>Promise<any>} scopedCallback
	 * @returns {(event:Event)=>void}
	 * - `autoqueued` & `autoScoped` callback
	 */
	static listener = (scopedCallback) => {
		const documentScope = helper.currentDocumentScope;
		/**
		 * @param {Event} event
		 */
		return (event) => {
			Lifecycle.manualScope({
				documentScope,
				runCheckAtFirst: true,
				scopedCallback: async () => {
					await scopedCallback(event);
				},
			});
		};
	};
}
