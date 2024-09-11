// @ts-check

import { $ } from './$.mjs';
import { handlePromiseAll } from './handlePromiseAll.mjs';
import { helper } from './helper.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';
import { setDomReflector } from './setDomReflector.mjs';

/**
 * @template V
 */
export class Let {
	/**
	 * remove all effects
	 * @return {void}
	 */
	removeAll$ = () => {
		this.S = [];
	};
	/**
	 * remove effect
	 * @param {$} $
	 * @return {void}
	 */
	remove$ = ($) => {
		this.S = this.S.filter((S) => $.E !== S);
	};
	/**
	 * subscription
	 * @private
	 * @type {((isAtInitialization:boolean)=>Promise<void>)[]}
	 */
	S = [];
	/**
	 * value placeholder
	 * @private
	 * @type {V}
	 */
	V_;
	call$ = () => {
		if (!this.S.length) {
			return;
		}
		helper.QH.A(
			new queueObjectFIFO(async () => {
				await handlePromiseAll(this.S, false);
			}, helper.D)
		);
	};
	/**
	 * @param {V} value
	 * @param {string} [attributeName]
	 * @param {import("../indexPreBuild.mjs").documentScope} [documentScope]
	 */
	constructor(value, attributeName = undefined, documentScope = undefined) {
		this.V_ = value;
		if (attributeName) {
			new $(async () => {
				setDomReflector(this.value, attributeName, documentScope ?? document, this);
			});
		}
	}
	/**
	 * @returns {V}
	 */
	get value() {
		if (helper.S && !this.S.some((f) => f === helper.S)) {
			this.S.push(helper.S);
		}
		return this.V_;
	}
	/**
	 * @param {V} newValue
	 */
	set value(newValue) {
		if (this.V_ === newValue) {
			return;
		}
		this.V_ = newValue;
		this.call$();
	}
}
