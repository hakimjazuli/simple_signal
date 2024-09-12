export class OnViewPort {
    /**
     * @param {string} attributeName
     * @param {(element:IntersectionObserverEntry['target'])=>Promise<void>} OnViewCallback
     * @param {(element:IntersectionObserverEntry['target'], unObserve:()=>void)=>Promise<void>} [onExitingViewport]
     * undefined: will automatically fires unObserve callback;
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    constructor(attributeName: string, OnViewCallback: (element: IntersectionObserverEntry["target"]) => Promise<void>, onExitingViewport?: (element: IntersectionObserverEntry["target"], unObserve: () => void) => Promise<void>, documentScope?: import("./documentScope.type.mjs").documentScope);
}
