/**
 * @description
 * helper class to track connected and disconnected of an element, with attribute selector;
 * ```js
 * new Lifecycle({
 * [attributeName]: async(options)=>{
 *				// command;
 *			}
 *		},
 *		// [documentScope]
 *	)
 * ```
 */
export class Lifecycle {
    /**
     * lifecycleIdentification
     * @private
     * @type {string[]}
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
     * find deeply nested attribute name
     * @private
     * @param {HTMLElement|Element} node
     * @param {string} attributeName
     * @param {Node[]} found
     * @returns {Node[]}
     */
    private static FDN;
    /**
     * find deeply nested registered Disconecceted callbacks
     * @private
     * @param {HTMLElement|Element} node
     * @param {(Node)[]} found
     * @returns {(Node)[]}
     */
    private static FDNDCR;
    /**
     * @param {attributeLifecyclesHandler} attrLifecycleCallback
     * @param {documentScope} [documentScope]
     */
    constructor(attrLifecycleCallback: {
        [attributeName: string]: (options: import("./lifecycleHandler.type.mjs").lifecycleHandler) => Promise<void>;
    }, documentScope?: import("./documentScope.type.mjs").documentScope);
    /**
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     * @typedef {import('./Let.mjs').Let<MutationRecord[]>} LetMutationRecords
     */
    /**
     * registered effect
     * @private
     * @type {$}
     */
    private $;
    /**
     * @typedef {{
     * [attributeName:string]:
     * (options:import('./lifecycleHandler.type.mjs').lifecycleHandler)=>Promise<void>
     * }} attributeLifecyclesHandler
     */
    /**
     * @private
     * @type {attributeLifecyclesHandler}
     */
    private AL;
    /**
     * document scope
     * @private
     * @type {documentScope}
     */
    private DS;
    /**
     * observer
     * @private
     * @type {MutationObserver}
     */
    private O;
    /**
     * @private
     * @type {LetMutationRecords}
     */
    private ML;
    /**
     * elementConnectedRefed
     * @private
     * @type {(()=>Promise<void>)[]}
     */
    private elementCMRefed;
    /**
     * @type {()=>MutationRecord[]}
     */
    takeRecord: () => MutationRecord[];
    /**
     * initiator
     * @private
     */
    private I;
    /**
     * check element
     * @private
     * @param {MutationRecord[]} mutationList
     */
    private CE;
    /**
     * addedNodeCheck
     * @private
     * @param {Node} addedNode
     * @param {string} attributeName
     */
    private ANC;
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
     * check mutation disconnected
     * @private
     * @param {HTMLElement}removedNode
     */
    private CMDC;
    /**
     * @public
     */
    public disconnect: () => void;
}
