// @ts-check

import { queueFIFO } from './queueFIFO.mjs';

export class helper {
	/**
	 * subscriber
	 * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
	 */
	static S = null;
	static QH = new queueFIFO();
	/**
	 * debounce
	 * @type {number|false}
	 */
	static D = false;
	/**
	 * attribute helper for binded
	 */
	/**
	 * @readonly
	 */
	static V = 'hf_ss-binded_value';
	/**
	 * @readonly
	 */
	static LC = 'hf_ss-binded_lifecycle';
	/**
	 * storage identifier
	 * @readonly
	 */
	static SI = 'hf_ss-binded_storage';
	/**
	 * disconnected callback identifier
	 */
	static DCCBI = 'hf_ss-binded_dccb';
	/**
	 * attribute change callback identifier
	 */
	static ACCBI = 'hf_ss-binded_accb';
	/**
	 * onViewCallbackIdentifier
	 */
	static VCBI = `hf_ss-onview_cb`;
	/**
	 * onExitViewCallbackIdentifier
	 */
	static XVCBI = `hf_ss-onexitview_cb`;
	/**
	 * ForChildAttributePrefix
	 * @readonly
	 */
	static FCA = `hf_ss-child-`;
	/**
	 * ForAttributePrefix
	 * @readonly
	 */
	static FA = `for-`;
	/**
	 * childDerivedBinder
	 * use parent `attributeName`
	 * - example: `c-parentAttributeName-childAttributeName`
	 * @readonly
	 */
	static CDB = `c-`;
	/**
	 * @param {Object} class_
	 */
	static warningSingleton = (class_) => {
		console.warn({
			class: class_,
			message: 'is a singleton class, and can only be instantiated once',
		});
	};
}
