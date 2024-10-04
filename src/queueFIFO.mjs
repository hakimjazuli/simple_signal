// @ts-check

import { functions } from './functions.mjs';

export class queueFIFO {
	/**
	 * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
	 */
	/**
	 * @private
	 * @type {queueObjectFIFO['details'][]}
	 */
	queue = [];
	/**
	 * @private
	 * @type {boolean}
	 */
	isRunning = false;
	/**
	 * @param {queueObjectFIFO} _queue
	 */
	assign = (_queue) => {
		this.push(_queue);
		if (!this.isRunning) {
			this.run();
		}
	};
	/**
	 * @private
	 * @param {queueObjectFIFO} _queue
	 */
	push = (_queue) => {
		this.queue.push(_queue.details);
	};
	/**
	 * @private
	 */
	run = async () => {
		this.isRunning = true;
		while (this.queue.length !== 0) {
			for (let i = 0; i < this.queue.length; i++) {
				const [callback, debounce_ms] = this.queue[i];
				this.queue.shift();
				if (debounce_ms) {
					await functions.timeout(debounce_ms);
				}
				if (functions.isAsync(callback)) {
					await callback();
					break;
				}
				callback();
				break;
			}
		}
		this.isRunning = false;
	};
}
