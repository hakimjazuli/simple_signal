// @ts-check

import { helper } from './helper.mjs';
import { Lifecycle } from './Lifecycle.mjs';

/**
 * @description
 * - instantiate this class to opt in page templating,
 *  by saving html template string on a html document page;
 * ```html
 * // main page
 * <div ${templateName}="${path};${selector}"></div>
 * ```
 * ```html
 * // template document
 * <div ${targetAttribute}="${selector}"></div>
 * ```
 * - how it works:
 * > - the class itself register a `Lifecycle` for `templateName`,
 *     which then upon connected, it will fetch the `path` then selects `targetAttribute`="`selector`"
 *     as template that then replace main page element with selected element from template;
 * > - fetched page will be then be cached, along with any `[targetAttribute]` on that page
 */
export class UsePageTemplate {
	/**
	 * @private
	 * @typedef {{[templateName:string]:HTMLElement}} templateSingle
	 * @type {{[path:string]:templateSingle}}
	 */
	static chachedTemplate = {};
	/**
	 * @param {Object} options
	 * @param {string} options.callerAttribute
	 * @param {string} options.targetAttribute
	 * @param {string} [options.targetPrefix]
	 * @param {string} [options.targetSuffix]
	 * @param {import('./documentScope.type.mjs').documentScope} [options.documentScope]
	 */
	constructor({
		callerAttribute,
		targetAttribute,
		targetPrefix = '',
		targetSuffix = '',
		documentScope = document,
	}) {
		new Lifecycle(
			{
				[callerAttribute]: async ({ element, onConnected }) => {
					onConnected(async () => {
						const templateSelector = element.getAttribute(callerAttribute);
						if (!templateSelector) {
							console.warn({
								element,
								callerAttribute,
								message: `attributeName "${callerAttribute}" must have value to be used as templateSelector`,
							});
							return;
						}
						const [path, templateName] = templateSelector.split(helper.separator);
						const template = await UsePageTemplate.getTemplate(
							path,
							targetAttribute,
							templateName,
							targetPrefix,
							targetSuffix
						);
						const template_ = template.cloneNode(true);
						element.replaceWith(template_);
					});
				},
			},
			documentScope
		);
	}
	/**
	 * @param {string} path
	 * @param {string} targetAttribute
	 * @param {string} templateName
	 * @param {string} targetPrefix
	 * @param {string} targetSuffix
	 */
	static getTemplate = async (
		path,
		targetAttribute,
		templateName,
		targetPrefix,
		targetSuffix
	) => {
		const fromCache = UsePageTemplate.chachedTemplate[path]?.[templateName];
		if (fromCache) {
			return fromCache;
		}
		try {
			const response = await fetch(`${targetPrefix}${path}${targetSuffix}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const htmlString = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlString, 'text/html');
			UsePageTemplate.chachedTemplate[path] = {};
			const templates = doc.querySelectorAll(`[${targetAttribute}]`);
			let retElement;
			for (let i = 0; i < templates.length; i++) {
				const templateElement = templates[i];
				const templateName_ = templateElement.getAttribute(targetAttribute);
				if (!(templateElement instanceof HTMLElement)) {
					continue;
				}
				UsePageTemplate.chachedTemplate[path][templateName_] = templateElement;
				if (templateName_ === templateName) {
					retElement = templateElement;
				}
			}
			if (retElement) {
				return retElement;
			}
			throw new Error(
				`couldn't find '[${targetAttribute}="${templateName}"]' in the ${path}`
			);
		} catch (error) {
			console.error('Error fetching and parsing HTML:', error);
		}
	};
}
