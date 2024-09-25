// @ts-check

import { helper } from './helper.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * generate side effect for `signal` based reactivity such as for:
 * - [Let](#let)
 * ```js
 * const letExample = new Let('')
 * new $(async(first)=>{
 *  const value = test.value;
 *  if(first){
 *      return;
 *      // return early if you want to opt out from handling the effect immediately,
 *      // also by doing this you can make the `$` slightly more performance 1) when dealing with `async await` on hydration,
 *      // such as data fetching;
 *  }
 *      // handle value
 * })
 * // 1) and when all of the effects is registered, you can call `letExample.call$` to call for effect in parallel;
 * ```
 * - [Derived](#derived)
 * ```js
 * // bassically the same with `Let` but use `new Derived`
 * ```
 */
export class $ {
	E;
	/**
	 * @private
	 */
	first = true;
	/**
	 * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
	 */
	constructor(asyncCallback) {
		this.E = asyncCallback;
		new Ping(true, async () => {
			helper.S = asyncCallback;
			await asyncCallback(this.first);
			this.first = false;
			helper.S = null;
		});
	}
}
