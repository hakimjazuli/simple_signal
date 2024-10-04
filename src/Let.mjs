// @ts-check

import { $ } from './$.mjs';
import { handlePromiseAll } from './handlePromiseAll.mjs';
import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { Ping } from './Ping.mjs';
import { domReflector } from './domReflector.mjs';
import { functions } from './functions.mjs';

/**
 * @description
 * `signal` based reactivity;
 * assigning newValue to Let insance:
 * ```js
 * const letSingle = new Let(1, ...args);
 * letSingle.value++; // 2;
 * letSingle.value = 3 // 3;
 * ```
 * `dataOnly`:
 * ```js
 * const dataOnlyExample = Let.dataOnly(args0);
 * ```
 * - this will automatically opt you out from `domReflector`
 * make sure to check `argument` documentation in your `IDE` `typehint`;
 * - `methods`:
 * > - `call$`: manually triggers `effects` subscribed to `thisInstance`;
 * > - `remove$`: unubscribe `thisInstance` from specific `effect`;
 * > - `removeAll$`: unubscribe `thisInstance` from all of its `effects`;
 */
/**
 * @template V
 */
export class Let {
	/**
	 * @template V
	 * @param {V} data
	 * @returns {Let<V>}
	 */
	static dataOnly = (data) => new Let(data);
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
	 * destroy all props
	 */
	unRef = () => {
		this.removeAll$();
		this.V_ = null;
		this.attr = null;
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
		new Ping(true, async () => {
			await handlePromiseAll(this.S, false);
		});
	};
	/**
	 * @param {V} value
	 * @param {string} [attributeName]
	 * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
	 */
	constructor(value, attributeName = undefined, documentScope = undefined) {
		this.V_ = value;
		if (attributeName) {
			this.attr = attributeName;
			documentScope = documentScope ?? document;
			new Lifecycle(
				{
					[attributeName]: async ({ element, onConnected, onDisconnected }) => {
						onConnected(async () => {
							const effect = new $(async () => {
								domReflector(this.value, attributeName, element, this);
							});
							onDisconnected(async () => {
								this.remove$(effect);
								if (typeof element.oninput === 'function') {
									element.oninput = null;
								}
							});
						});
					},
				},
				documentScope
			);
		}
	}
	/**
	 * @type {undefined|string}
	 */
	attr = undefined;
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
