export class Lifecycle {
    /**
     * @param {{
     * [attributeName:string]:
     * (element:HTMLElement|Element, unObserve:()=>void)=>(Promise<()=>Promise<void>>)
     * }} attrLifecycleCallback
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    constructor(attrLifecycleCallback: {
        [attributeName: string]: (element: HTMLElement | Element, unObserve: () => void) => (Promise<() => Promise<void>>);
    }, documentScope?: import("./documentScope.type.mjs").documentScope);
    /**
     * registered effect
     * @private
     * @type {$}
     */
    private $;
    /**
     * attributes lifecycle callbacks
     * @private
     * @type {{
     * [attributeName:string]:
     * (element:HTMLElement|Element, unObserve:()=>void)=>(Promise<()=>Promise<void>>)
     * }}
     */
    private AL;
    /**
     * document scope
     * @private
     * @type {import('./documentScope.type.mjs').documentScope}
     */
    private DS;
    /**
     * @private
     * @type {MutationObserver}
     */
    private O;
    /**
     * @private
     * @type {Let<MutationRecord[]>}
     */
    private ML;
    /**
     * disconnected callbacks
     * @private
     * @type {{
     * [attributeName:string]: ()=>Promise<void>
     * }}
     */
    private DC;
    /**
     * @private
     */
    private CE;
    unObserve: () => void;
}
