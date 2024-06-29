// @ts-ignore

import { _QueueObjectFIFO, _QueueFIFO } from '@html_first/simple_queue';

let subscriber = null;
const queue_handler = new _QueueFIFO();

/**
 * @template V
 * @typedef {{
 *   get value(): V,
 *   set value(newValue: V)
 * }} let_type_returns
 */
/**
 * @callback let_type
 * @param {V} value -
 * @returns {let_type_returns<V>}
 */
/**
 * @type {let_type}
 */
const signal = (value) => {
	/**
	 * @type {(()=>Promise<void>)[]}
	 */
	const subscription = [];
	return {
		get value() {
			if (subscriber) {
				subscription.push(subscriber);
			}
			return value;
		},
		set value(new_value) {
			value = new_value;
			queue_handler.assign(
				new _QueueObjectFIFO(async () => {
					await Promise.all(
						subscription.map(async (callback) => {
							try {
								return await callback();
							} catch (error) {
								console.error('Error in callback:', error);
								throw error;
							}
						})
					).catch((error) => {
						console.error('Promise.all failed:', error);
					});
				}, false)
			);
		},
	};
};

/**
 * @param {()=>Promise<void>} fn
 * @returns {Promise<void>}
 */
const $ = async (fn) => {
	subscriber = fn;
	await fn();
	subscriber = null;
};

/**
 * @callback derived_type
 * @param {()=>Promise<void>} fn
 * @returns {let_type_returns}
 */
/**
 * @type {derived_type}
 */
const derived = (fn) => {
	const computed_ = signal();
	$(async () => {
		computed_.value = await fn();
	});
	return computed_;
};
window['signal'] = signal;
window['$'] = $;
window['derived'] = derived;
