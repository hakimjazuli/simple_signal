// @ts-check

import { $ } from './$.mjs';
import { Let } from './Let.mjs';

/**
 * @template V
 */
export class Derived extends Let {
	/**
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {string} [attributeName]
	 * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
	 */
	constructor(asyncCallback, attributeName = undefined, documentScope = undefined) {
		super('', attributeName, documentScope);
		new $(async () => {
			super.value = await asyncCallback();
		});
	}
	get value() {
		return super.value;
	}
	set value(v) {
		console.warn('you are not allowed to change Derived value manually');
	}
}
