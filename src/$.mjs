// @ts-check

import { helper } from './helper.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

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
		helper.QH.A(
			new queueObjectFIFO(async () => {
				helper.S = asyncCallback;
				await asyncCallback(this.first);
				this.first = false;
				helper.S = null;
			}, helper.D)
		);
	}
}
