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
export class DefinePageTemplate {
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
     */
    static getTemplate: (path: string, targetAttribute: string, templateName: string) => Promise<HTMLElement>;
    /**
     * @param {Object} options
     * @param {string} options.callerAttribute
     * @param {string} options.targetAttribute
     * @param {(path:string)=>string} [options.targetPathRule]
     * - return processed path
     * @param {import('./documentScope.type.mjs').documentScope} [options.documentScope]
     */
    constructor({ callerAttribute, targetAttribute, targetPathRule, documentScope, }: {
        callerAttribute: string;
        targetAttribute: string;
        targetPathRule?: (path: string) => string;
        documentScope?: import("./documentScope.type.mjs").documentScope;
    });
}
