// @ts-check

import { helper } from './helper.mjs';
import { Let } from './Let.mjs';

/**
 * @param {any} val
 * @param {string} attributeName
 * @param {import("../indexPreBuild.mjs").documentScope} documentScope
 * @param {Let} letObject
 * @returns {void}
 */
export const setDomReflector = (val, attributeName, documentScope, letObject) => {
	const elements = Array.from(documentScope.querySelectorAll(`[${attributeName}]`));
	if (
		!(documentScope instanceof ShadowRoot) &&
		!(documentScope instanceof Document) &&
		documentScope.hasAttribute(attributeName)
	) {
		elements.push(documentScope);
	}
	if (!elements) {
		return;
	}
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const targets = (element.getAttribute(attributeName) ?? '').split(';');
		for (let i = 0; i < targets.length; i++) {
			const target = targets[i];
			try {
				if (!(target in element)) {
					throw '';
				}
				element[target] = val;
				if (
					target === 'value' &&
					'value' in element &&
					element.parentNode &&
					element instanceof HTMLInputElement &&
					!element.hasAttribute(helper.V)
				) {
					element.setAttribute(helper.V, '');
					const updater = () => {
						letObject.value = element.value;
					};
					element.addEventListener('input', updater);
					new MutationObserver((mutationsList, observer) => {
						for (let mutation of mutationsList) {
							if (mutation.type === 'childList') {
								for (let i = 0; i < mutation.removedNodes.length; i++) {
									if (mutation.removedNodes[i] === element) {
										element.removeEventListener('input', updater);
										observer.disconnect();
										return;
									}
								}
							}
						}
					}).observe(element.parentNode, { childList: true });
				}
			} catch (error) {
				val = JSON.stringify(val).replace(/^"(.*)"$/, '$1');
				if (target == '') {
					console.warn({
						element,
						attributeName,
						message: "doesn't have target",
					});
					return;
				}
				element.setAttribute(target, val);
			}
		}
	}
};
