// @ts-check

import { queueFIFO } from './queueFIFO.mjs';

/**
 * uses generic class instance instead of const, to track whether there are
 * unnamed property being accessed
 */
export const helper = new (class {
	/**
	 * subscriber
	 * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
	 */
	S = null;
	QH = new queueFIFO();
	/**
	 * debounce
	 * @type {number|false}
	 */
	D = false;
	/**
	 * attribute helper for binded
	 */
	/**
	 * @readonly
	 */
	P = 'hf_ss-binded_viewport';
	/**
	 * @readonly
	 */
	PX = 'hf_ss-binded_viewport_on_exit';
	/**
	 * @readonly
	 */
	V = 'hf_ss-binded_value';
	/**
	 * @readonly
	 */
	LC = 'hf_ss-binded_lifecycle';
})();
