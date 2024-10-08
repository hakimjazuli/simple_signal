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
     */
    static getTemplate: (path: string, targetAttribute: string, templateName: string) => Promise<HTMLElement>;
    /**
     * @param {string} callerAttribute
     * @param {string} targetAttribute
     * @param {import('./documentScope.type.mjs').documentScope} documentScope
     */
    constructor(callerAttribute: string, targetAttribute: string, documentScope?: import("./documentScope.type.mjs").documentScope);
}
