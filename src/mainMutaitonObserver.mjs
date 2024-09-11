// @ts-check

import { Let } from './Let.mjs';

export class mainMutaitonObserver {
	/**
	 * @type {mainMutaitonObserver}
	 */
	static __;
	constructor() {
		if (mainMutaitonObserver.__ instanceof mainMutaitonObserver) {
			return;
		}
		mainMutaitonObserver.__ = this;
		this.documentMutation_ = new Let('');
		this.documentObserver = new MutationObserver((mutationList) => {
			mutationList.forEach((mutation) => {
				// @ts-ignore
				this.documentMutation_.value = mutation;
			});
		});
		this.documentObserver.observe(document, {
			childList: true,
			subtree: true,
		});
	}
}
