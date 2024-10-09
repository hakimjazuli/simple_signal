// @ts-check

import { Let } from './Let.mjs';

export class mutaitonObserver {
	/**
	 * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
	 * @typedef {import('./Let.mjs').Let<MutationRecord[]>} mutationRecordSignal
	 * @typedef {[MutationObserver,
	 * mutationRecordSignal,
	 * documentScope,
	 * ]} documentScopedReturn
	 */
	/**
	 * @private
	 * @type {documentScopedReturn[]}
	 */
	static registeredDocumentScope = [];
	/**
	 * @param {documentScope} documentScope
	 * @return {documentScopedReturn}
	 */
	static create = (documentScope) => {
		const ret = mutaitonObserver.registeredDocumentScope.filter(
			([MutationObserver, MutationRecordSignal, documentScope_]) => {
				return documentScope_ === documentScope;
			}
		)[0];
		if (ret) {
			return ret;
		}
		/**
		 * @type {mutationRecordSignal}
		 */
		// @ts-ignore
		const documentMutations_ = new Let('');
		const documentObserver = new MutationObserver((mutationList) => {
			documentMutations_.value = mutationList;
		});
		documentObserver.observe(documentScope, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		/**
		 * @type {documentScopedReturn}
		 */
		const ret_ = [documentObserver, documentMutations_, documentScope];
		mutaitonObserver.registeredDocumentScope.push(ret_);
		return ret_;
	};
}
