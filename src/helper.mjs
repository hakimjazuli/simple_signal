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
	 * signal with value as target
	 * @readonly
	 */
	static V = 'hf_ss-b-a-val';
	/**
	 * storage identifier
	 * @readonly
	 */
	static SI = 'hf_ss-b-store';
	/**
	 * disconnected callback identifier
	 */
	static DCCBI = 'hf_ss-b-dc';
	/**
	 * attribute change callback identifier
	 */
	static ACCBI = 'hf_ss-b-ac';
	/**
	 * onViewCallbackIdentifier
	 */
	static VCBI = `hf_ss-ov`;
	/**
	 * onExitViewCallbackIdentifier
	 */
	static XVCBI = `hf_ss-oxv`;
	/**
	 * ForChildAttributePrefix
	 * @readonly
	 */
	static FCA = `hf_ss-fc-`;
	/**
	 * globalSignalPrefix
	 * @readonly
	 */
	static G = `g-`;
	/**
	 * @param {Object} class_
	 */
	static warningSingleton = (class_) => {
		console.warn({
			class: class_,
			message: 'is a singleton class, and can only be instantiated once',
		});
	};
	/**
	 * @private
	 */
	static generateUniqueString() {
		const timestamp = Date.now();
		const randomPart = Math.floor(Math.random() * 1_000_000);
		return `${timestamp}${randomPart}`;
	}
	/**
	 * @type {string|null}
	 */
	static attr = null;
	/**
	 * @type {import('./documentScope.type.mjs').documentScope}
	 */
	static currentDocumentScope = window.document;
	/**
	 * @private
	 * @type {string}
	 */
	static attrPrefix = 'hf_ss-a-';
	/**
	 * @return {string|null}
	 */
	static attributeIndexGenerator = () => {
		if (helper.currentDocumentScope == window.document) {
			return (this.attr = null);
		}
		return (this.attr = `${helper.attrPrefix}${this.generateUniqueString()}`);
	};
}
