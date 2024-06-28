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
 * @callback let_type
 * @param {V} value
 * @returns {let_type_returns} An object containing getter and setter for the value.
 * @type {let_type}
 */
window['let_'] = (value) => {
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
 * @returns {void}
 */
window['$'] = (fn) => {
	subscriber = fn;
	fn();
	subscriber = null;
};

/**
 * @callback derived_type
 * @param {()=>any} fn
 * @returns {let_type_returns}
 * @type {derived_type}
 */
window['derived'] = (fn) => {
	const computed_ = let_();
	$_(() => {
		computed_.value = fn();
	});
	return computed_;
};
