/**
 * @description
 * - helper class to track connected/disconnected/attributeChanged of an element;
 * - all global `signal` with dom relector that need to be available for `parent scope` should be prefixed with `g-`;
 */
export class Lifecycle {
    /**
     * @typedef {{
     * [attributeName:string]:
     * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>void
     * }} attributeLifecyclesHandler
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     */
    /**
     * attributeIdentification
     * @private
     * @type {Map<documentScope,attributeLifecyclesHandler>}
     */
    private static ID;
    /**
     * @private
     * @param {HTMLElement} element
     * @param {()=>Promise<void>} disconnectedCallback
     * @returns {void}
     */
    private static setDCCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @returns {void|(()=>Promise<void>)[]}
     */
    private static getDCCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @param {import('./lifecycleHandler.type.mjs').attributeChangedLifecycle} attributeChangedCallback
     * @returns {void}
     */
    private static setACCB;
    /**
     * @private
     * @param {HTMLElement|Element} element
     * @returns {void|import('./lifecycleHandler.type.mjs').attributeChangedLifecycle}
     */
    private static getACCB;
    /**
     * find deeply nested registered Disconecceted callbacks
     * @private
     * @param {HTMLElement|Element} node
     * @param {(Node)[]} found
     * @returns {(Node)[]}
     */
    private static FDNDCR;
    /**
     * @param {attributeLifecyclesHandler} attributeLifecyclesHandler
     * @param {documentScope} documentScope
     */
    constructor(attributeLifecyclesHandler: {
        [attributeName: string]: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => void;
    }, documentScope?: import("./documentScope.type.mjs").documentScope);
    /**
     * currentDocumentScope
     * @private
     * @type {documentScope}
     */
    private CDS;
    disconnect: () => void;
    /**
     * @type {() => MutationRecord[]}
     */
    takeRecords: () => MutationRecord[];
    /**
     * @private
     * @type {import('./Let.mjs').Let<MutationRecord[]>}
     */
    private mLet;
    /**
     * @private
     * @type {MutationObserver}
     */
    private mObs;
    /**
     * @private
     * @type {$}
     */
    private $;
    /**
     * @private
     * @type {attributeLifecyclesHandler}
     */
    private AL;
    /**
     * isRegisteredMap
     * @private
     * @return {"partial"|"whole"|string}
     */
    private IRM;
    /**
     * initiator
     * @private
     * @returns {Promise<void>}
     */
    private I;
    /**
     * elementConnectedRefed
     * @private
     * @type {(()=>Promise<void>)[]}
     */
    private elementCMRefed;
    /**
     * checkValidScoping
     * @private
     * @param {documentScope} node
     * @returns {boolean}
     */
    private CVS;
    /**
     * addedNodeHanlder
     * @private
     * @param {Node} addedNode
     * @param {string} attributeName
     */
    private ANH;
    /**
     * callConnectedCallback
     * @private
     */
    private callCB;
    /**
     * call attributeConnectedCallback
     * @private
     * @param {HTMLElement|Element} element
     * @param {string} attributeName
     */
    private callACCB;
    /**
     * @private
     * @param {MutationRecord[]} mutationList
     */
    private CE;
    /**
     * check mutation disconnected
     * @private
     * @param {HTMLElement}removedNode
     */
    private CMDC;
}
