// @ts-check

import { validateHtmlTagAttrName } from './validateHtmlTagAttrName.mjs';

/**
 * @template {{
 * [x: string]: ''
 * }} attrHelpers
 * @param {attrHelpers} attrHelpers
 * @returns {Record.<keyof NonNullable<attrHelpers>, string>}
 */
export const attrHelper = (attrHelpers) => {
	/**
	 * @type {Record.<keyof NonNullable<attrHelpers>, string>}
	 */
	// @ts-ignore
	const attrs_ = {};
	for (const attr in attrHelpers) {
		attrs_[attr] = validateHtmlTagAttrName(attr.toString());
	}
	return attrs_;
};
