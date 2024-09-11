// @ts-check

import { helper } from './helper.mjs';
import { queueObjectFIFO } from './queueObjectFIFO.mjs';

export class OnViewPort {
	/**
	 * @param {string} attributeName
	 * @param {(element:IntersectionObserverEntry['target'])=>Promise<void>} OnViewCallback
	 * @param {(element:IntersectionObserverEntry['target'], unObserve:()=>void)=>Promise<void>} [onExitingViewport]
	 * undefined: will automatically fires unObserve callback;
	 * @param {import('./documentScope.types.mjs').documentScope} [documentScope]
	 */
	constructor(
		attributeName,
		OnViewCallback,
		onExitingViewport = async (e, u) => {
			u();
		},
		documentScope = document
	) {
		const elements = documentScope.querySelectorAll(`[${attributeName}]`);
		if (!elements) {
			return;
		}
		const observer = new IntersectionObserver(
			(elements, observer) => {
				helper.QH.A(
					new queueObjectFIFO(async () => {
						for (let i = 0; i < elements.length; i++) {
							const element = elements[i].target;
							if (elements[i].isIntersecting) {
								element.setAttribute(helper.PX, '');
								await OnViewCallback(element);
							} else if (element.hasAttribute(helper.PX)) {
								await onExitingViewport(element, () => observer.disconnect());
							}
						}
					}, helper.D)
				);
			},
			{ threshold: [0, 0] }
		);
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			if (element.hasAttribute(helper.P)) {
				return;
			}
			element.setAttribute(helper.P, '');
			observer.observe(element);
		}
	}
}
