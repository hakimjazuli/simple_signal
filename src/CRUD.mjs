// @ts-check

import { Let } from './Let.mjs';
import { List } from './List.mjs';
import { Ping } from './Ping.mjs';

/**
 * @template V
 */
export class CRUD {
	/**
	 * @typedef {{asyncCallback:()=>Promise<void>,refreshSignal:boolean}} asyncCallback
	 * @param {Object} options
	 * @param {Let<V>|List} options.signal
	 * @param {()=>Promise<any>} options.read
	 * @param {asyncCallback} [options.create]
	 * @param {asyncCallback} [options.update]
	 * @param {asyncCallback} [options.delete_]
	 */
	constructor({ signal, read, create = undefined, update = undefined, delete_ = undefined }) {
		let modifier;
		if (signal instanceof List) {
			modifier = async () => {
				signal.replace(await read());
			};
		} else if (signal instanceof Let) {
			modifier = async () => {
				signal.value = await read();
			};
		} else {
			return;
		}
		this.read = new Ping(false, async () => {
			await modifier();
		}).ping;
		const mapped = {
			create: create,
			update: update,
			delete: delete_,
		};
		for (const name in mapped) {
			if (mapped[name].source) {
				this[name] = new Ping(false, async () => {
					const source = mapped[name];
					await source.asyncCallback();
					if (source.refreshSignal) {
						await modifier();
					}
				}).ping;
			} else {
				this[name] = () => {
					console.warn({ message: `this CRUD.intstance has no ${name} method defined` });
				};
			}
		}
	}
	/**
	 * @type {Ping["ping"]}
	 */
	read;
	/**
	 * @type {()=>void}
	 */
	create;
	/**
	 * @type {()=>void}
	 */
	update;
	/**
	 * @type {()=>void}
	 */
	delete;
}
