// @ts-check

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
		/**
		 * @type {import('./Let.mjs').Let<MutationRecord[]>}
		 */
		// @ts-ignore
		this.documentMutations_ = new Let('');
		this.documentObserver = new MutationObserver((mutationList) => {
			this.documentMutations_.value = mutationList;
		});
		this.documentObserver.observe(document, {
			childList: true,
			subtree: true,
		});
	}
}
