// @ts-check

import { helper } from './helper.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

/**
 * @description
 * trigger based callback integrated to the internal library  queue handler;
 * can be created using class instantiation;
 */
export class Ping {
	/**
	 * async callback when pinged
	 * @private
	 * @type {(isAtInitisalization:boolean)=>Promise<void>}
	 */
	AC;
	/**
	 * @param {boolean} callsAtFirst
	 * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
	 */
	constructor(callsAtFirst, asyncCallbackWhenPinged) {
		this.AC = asyncCallbackWhenPinged;
		if (callsAtFirst) {
			this.ping(true);
		}
	}
	/**
	 * @param {boolean} first
	 */
	ping = (first = false) => {
		helper.QH.A(
			new queueObjectFIFO(async () => {
				await this.AC(first);
			}, helper.D)
		);
	};
}
