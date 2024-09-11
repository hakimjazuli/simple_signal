// @ts-check

import { helper } from './helper.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

export class Ping {
	/**
	 * async callback when pinged
	 * @private
	 * @type {(isAtInitisalization:boolean)=>Promise<void>}
	 */
	AC;
	/**
	 * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
	 */
	constructor(asyncCallbackWhenPinged) {
		this.AC = asyncCallbackWhenPinged;
		this.ping(true);
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
