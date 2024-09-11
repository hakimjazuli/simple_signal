/**
 * @typedef {HTMLElement|Element|ShadowRoot|Document} documentScope
 */
export class OnViewPort {
    /**
     * @param {string} attributeName
     * @param {(element:IntersectionObserverEntry['target'])=>Promise<void>} OnViewCallback
     * @param {(element:IntersectionObserverEntry['target'], unObserve:()=>void)=>Promise<void>} [onExitingViewport]
     * undefined: will automatically fires unObserve callback;
     * @param {documentScope} [documentScope]
     */
    constructor(attributeName: string, OnViewCallback: (element: IntersectionObserverEntry['target']) => Promise<void>, onExitingViewport?: (element: IntersectionObserverEntry['target'], unObserve: () => void) => Promise<void>, documentScope?: documentScope);
}
export type documentScope = HTMLElement | Element | ShadowRoot | Document;
