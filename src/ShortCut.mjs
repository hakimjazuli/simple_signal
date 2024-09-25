// @ts-check
import { Ping } from './Ping.mjs';

/**
 * @description
 * - helper class to create `ShortCut` through class instantiation;
 * - call `thisInstance.ping` to manually trigger action
 */
export class ShortCut {
	/**
	 * @param {Object} options
	 * @param {(event:KeyboardEvent)=>boolean} options.action
	 * @param {(isAtInitisalization:boolean)=>Promise<void>} options.asyncCallback
	 */
	constructor({ action, asyncCallback }) {
		this.ping = new Ping(false, asyncCallback).ping;
		this.action = action;
		window.addEventListener('keydown', this.event);
	}
	/**
	 * @private
	 */
	action;
	/**
	 * @private
	 * @param {KeyboardEvent} event
	 */
	event = (event) => {
		if (this.action(event)) {
			this.ping();
		}
	};
	/**
	 * call this method to trigger `asyncCAllback`;
	 */
	ping;
	disable = () => {
		window.removeEventListener('keydown', this.event);
		this.ping = null;
	};
}
