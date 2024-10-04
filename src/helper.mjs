// @ts-check

import { queueFIFO } from './queueFIFO.mjs';

export class helper {
	/**
	 * subscriber
	 * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
	 */
	static subscriber = null;
	static queueHandler = new queueFIFO();
	/**
	 * @type {number|false}
	 */
	static debounce = false;
	/**
	 * @readonly
	 */
	static val = 'hf_ss-b-a-val';
	/**
	 * @readonly
	 */
	static storageIdentifier = 'hf_ss-b-store';
	static DCCBIdentifier = 'hf_ss-b-dc';
	static ACCBIdentifier = 'hf_ss-b-ac';
	static onViewCBIdentifier = `hf_ss-ov`;
	static onExitViewCBIdentifier = `hf_ss-oxv`;
	/**
	 * @readonly
	 */
	static ForChildAttributePrefix = `hf_ss-fc-`;
	/**
	 * @readonly
	 */
	static globalSignalPrefix = `g-`;
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
	 * @type {string}
	 */
	static slotPrefix = 'hf_ss-slot-';
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
