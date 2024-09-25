// @ts-check

import { $ } from './$.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';

/**
 * @description
 * create named storage (`localStorage` or `sessionStorage`) through class instantiation;
 * - register by putting import this instance on your js `main file`
 */
/**
 * @template {{[localName:string]:string}} Local
 * @template {Extract<keyof Local,string>} LocalKey
 * @template {{[localName:string]:string}} Session
 * @template {Extract<keyof Session,string>} SessionKey
 */
export class DefineStorage {
	/**
	 * @type {DefineStorage}
	 */
	static __;
	/**
	 * @param {Object} data
	 * @param {Local} [data.local]
	 * @param {Session} [data.session]
	 */
	constructor({ local, session }) {
		if (DefineStorage.__ instanceof DefineStorage) {
			helper.warningSingleton(DefineStorage);
			return;
		}
		DefineStorage.__ = this;
		if (local) {
			this.defaultLocal = local;
		}
		if (session) {
			this.defaultSession = session;
		}
		for (const key in local) {
			this.resolve('local', key, local[key]);
		}
		for (const key in session) {
			this.resolve('session', key, session[key]);
		}
		this.autoDeprecate();
	}
	/**
	 * @type { Record<LocalKey,string> }
	 */
	defaultLocal;
	/**
	 * @type { Record<SessionKey,string> }
	 */
	defaultSession;
	/**
	 * @private
	 */

	/**
	 * @private
	 * @param {string} name
	 * @returns {string}
	 */
	static nameSpace = (name) => {
		return `${helper.SI}-${name}`;
	};
	/**
	 * @param {Record<LocalKey,Let<string>>} local
	 * @param {Record<SessionKey,Let<string>>} session
	 */
	data = Let.dataOnly({ local: {}, session: {} });
	/**
	 * @private
	 * @param {"session"|"local"} storage
	 * @param {string} name
	 * @param {string} defaultValue
	 */
	resolve = (storage, name, defaultValue) => {
		name = DefineStorage.nameSpace(name);
		let storageMode;
		switch (storage) {
			case 'local':
				storageMode = localStorage;
				break;
			case 'session':
				storageMode = sessionStorage;
				break;
		}
		const keyIsExist = storageMode.getItem(name);
		let store;
		if (keyIsExist) {
			store = this.data.value[storage][name] = Let.dataOnly(keyIsExist);
		} else {
			store = this.data.value[storage][name] = Let.dataOnly(defaultValue);
		}
		new $(async () => {
			storageMode.setItem(name, store.value);
		});
	};
	refreshLocal = () => {
		const localKeys = Object.keys(localStorage);
		for (const key of localKeys) {
			if (!key.startsWith(helper.SI)) {
				continue;
			}
			localStorage.removeItem(key);
			this.resolve('local', key, this.defaultLocal[key]);
		}
	};
	refreshSession = () => {
		const sessionKeys = Object.keys(sessionStorage);
		for (const key of sessionKeys) {
			if (!key.startsWith(helper.SI)) {
				continue;
			}
			sessionStorage.removeItem(key);
			this.resolve('session', key, this.defaultSession[key]);
		}
	};
	refreshBoth = () => {
		this.refreshLocal();
		this.refreshSession();
		this.autoDeprecate();
	};
	/**
	 * @private
	 * delete previously set by app, but no longer on the list;
	 */
	autoDeprecate = () => {
		const sessionKeys = Object.keys(sessionStorage);
		const sessionCompare = Object.keys(this.data.value.session);
		for (const key of sessionKeys) {
			if (key.startsWith(helper.SI) && !sessionCompare.includes(key)) {
				sessionStorage.removeItem(key);
			}
		}
		const localKeys = Object.keys(localStorage);
		const localComapare = Object.keys(this.data.value.local);
		for (const key of localKeys) {
			if (key.startsWith(helper.SI) && !localComapare.includes(key)) {
				localStorage.removeItem(key);
			}
		}
	};
}
