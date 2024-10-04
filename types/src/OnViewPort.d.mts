/**
 * @description
 * lifecycle wrapper to observe whether element is in viewport
 */
export class OnViewPort {
    /**
     *  * @typedef {{
     * [attributeName:string]:
     * import('./onViewPortHandler.type.mjs').onViewPortHandler
     * }} onViewPortatributesHandler
     */
    /**
     * @param {onViewPortatributesHandler} attributeHandler
     * undefined: will automatically fires unObserve callback;
     * @param {import('./documentScope.type.mjs').documentScope} documentScope
     */
    constructor(attributeHandler: {
        [attributeName: string]: import("./onViewPortHandler.type.mjs").onViewPortHandler;
    }, documentScope?: import("./documentScope.type.mjs").documentScope);
    /**
     * @private
     * @type {Lifecycle}
     */
    private lifecycleObserver;
    /**
     * @private
     * @type {onViewPortatributesHandler}
     */
    private attrbuteHandler;
    /**
     * @private
     */
    private observer;
    /**
     * @returns {IntersectionObserverEntry[]}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords
     */
    takeRecords: () => IntersectionObserverEntry[];
    /**
     * @returns {void}
     * @see https://developer.mozilla.org/docs/Web/API/IntersectionObserver/disconnect
     */
    disconnect: () => void;
    root: Element | Document;
    rootMargin: string;
    /**
     * @param {Element|HTMLElement} element
     * @returns
     */
    unobserve: (element: Element | HTMLElement) => void;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @return {import('./onViewPortHandler.type.mjs').onViewPortHandlerDisconnector}
     */
    private disconnectedTypeParam;
    /**
     * @private
     * @param {IntersectionObserverEntry} entry
     */
    private handleEntry;
}
