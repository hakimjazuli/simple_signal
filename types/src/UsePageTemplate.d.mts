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
    private static chachedTemplate;
    /**
     * @param {string} path
     * @param {string} targetAttribute
     * @param {string} templateName
     * @param {string} targetPrefix
     * @param {string} targetSuffix
     */
    static getTemplate: (path: string, targetAttribute: string, templateName: string, targetPrefix: string, targetSuffix: string) => Promise<HTMLElement>;
    /**
     * @param {Object} options
     * @param {string} options.callerAttribute
     * @param {string} options.targetAttribute
     * @param {string} [options.targetPrefix]
     * @param {string} [options.targetSuffix]
     * @param {import('./documentScope.type.mjs').documentScope} [options.documentScope]
     */
    constructor({ callerAttribute, targetAttribute, targetPrefix, targetSuffix, documentScope, }: {
        callerAttribute: string;
        targetAttribute: string;
        targetPrefix?: string;
        targetSuffix?: string;
        documentScope?: import("./documentScope.type.mjs").documentScope;
    });
}
