/**
 * @description
 * - assign element to loop through ['List'](#list) as data to render child element using class instantiation;
 * - naming html attribute:
 * > - forAttributeName use `for-` as prefix in html;
 * > - keys form `List` can reflect to DOM by prefixing with `c-${forAttributeNameNoForPrefix}-`
 * - loped childElement:
 * > - must have `HTMLElement` as first children;
 * > - only first children will be used to loop through `List`, all other children will be deleted from the dom on `onConnected` event of parentElement;
 */
export class For {
    /**
     * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
     * @typedef {import('./List.mjs').ListValue_} ListValue
     * @typedef {Object} childLifeCycleCallback
     * @property {(arg0:{childElement:HTMLElement,ForController:For,childAttrPrefix:string})=>Promise<void>} childLifeCycleCallback.onConnected
     * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onDisconnected
     * @property {(arg0:{childElement:HTMLElement,ForController:For,attributeName:string, newValue:string})=>Promise<void>} childLifeCycleCallback.onAttributeChanged
     */
    /**
     * @param {import('./List.mjs').List} listInstance
     * @param {string} forAttributeName
     * - parent attributeName
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {import('./documentScope.type.mjs').documentScope} documentScope
     */
    constructor(listInstance: import("./List.mjs").List<any, any, any>, forAttributeName: string, childLifeCycleCallback: {
        onConnected: (arg0: {
            childElement: HTMLElement;
            ForController: For;
            childAttrPrefix: string;
        }) => Promise<void>;
        onDisconnected: (arg0: {
            childElement: HTMLElement;
            ForController: For;
        }) => Promise<void>;
        onAttributeChanged: (arg0: {
            childElement: HTMLElement;
            ForController: For;
            attributeName: string;
            newValue: string;
        }) => Promise<void>;
    }, documentScope?: import("./documentScope.type.mjs").documentScope);
    listInstance: import("./List.mjs").List<any, any, any>;
    /**
     * @type {string}
     */
    attr: string;
    DS: import("./documentScope.type.mjs").documentScope;
    /**
     * onParentConnected
     * @private
     * @param {HTMLElement} parentElement
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private PC;
    parentElement: HTMLElement;
    childElement: Element;
    /**
     * childLifecycle
     * @private
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private CL;
    /**
     * getChildElementIndex
     * @private
     * @param {HTMLElement} childElement
     * @returns {number}
     */
    private CI;
    /**
     * handleMutationList
     * @private
     * @param {import('./List.mjs').mutationType} mutationValue
     * @returns {Promise<void>}
     */
    private HML;
    /**
     * handle append/prepend
     * @private
     * @param {(ListValue)[]} listValue
     * @param {'append'|'prepend'} mode
     */
    private pend;
    /**
     * handlePush
     * @private
     * @param {(ListValue)[]} listValue
     */
    private HP;
    /**
     * handleUnshift
     * @private
     * @param {(ListValue)[]} listValue
     */
    private HU;
    /**
     * handleSlice
     * @private
     * @param {number} start
     * @param {number} end
     */
    private HSL;
    /**
     * handleSplice
     * @private
     * @param {number} start
     * @param {number} end
     * @param {(ListValue)[]} listValue
     */
    private HSP;
    /**
     * handleSplice
     * @private
     * @param {number} indexA
     * @param {number} indexB
     */
    private HSW;
    /**
     * handleModify
     * @private
     * @param {number} index
     * @param {ListValue} listValue
     * @returns {void}
     */
    private HM;
    /**
     * handleShift
     * @private
     * @returns {void}
     */
    private HSF;
}
