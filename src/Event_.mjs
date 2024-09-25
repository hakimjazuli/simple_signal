// @ts-check

import { Ping } from './Ping.mjs';

/**
 * @description
 * `eventListener` helper to create `autoqueued` callback;
 * ```js
 * // @ts-check
 * someObject.addEventListener('click', Event_.listener( (event) => {
 * // code
 * }))
 * ```
 */
export class Event_ {
	/**
	 * @param {(event:Event)=>Promise<any>} asyncCallback
	 * @returns {(event:Event)=>void}
	 * - `autoqueued` callback
	 */
	static listener = (asyncCallback) => {
		return (event) => {
			new Ping(true, async () => await asyncCallback(event));
		};
	};
}
