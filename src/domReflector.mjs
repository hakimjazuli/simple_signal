// @ts-check

import { functions } from './functions.mjs';
import { helper } from './helper.mjs';

/**
 * @param {any} val
 * @param {string} attributeName
 * @param {HTMLElement} element
 * @param {import('./Let.mjs').Let} letObject
 * @returns {void}
 */
export const domReflector = (val, attributeName, element, letObject) => {
	const targets = functions.splitX(element.getAttribute(attributeName) ?? '', ';');
	for (let j = 0; j < targets.length; j++) {
		const target = targets[j];
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
				!element.hasAttribute(helper.val)
			) {
				element.setAttribute(helper.val, '');
				element.oninput = () => {
					letObject.value = element.value;
				};
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
};
