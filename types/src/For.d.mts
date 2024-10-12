/**
 * @description
 * - assign element to loop through ['List'](#list) as data to render child element using class instantiation;
 * - loped childElement:
 * > - must have `HTMLElement` as first children;
 * > - only first children will be used to loop through `List`, all other children will be deleted from the dom before `onConnected` event of parentElement;
 */
export class For {
    /**
     * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
     * @typedef {import('./List.mjs').ListArg} ListArg
     * @typedef {Object} childLifeCycleCallback
     * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onConnected
     * @property {(arg0:{childElement:HTMLElement,ForController:For})=>Promise<void>} childLifeCycleCallback.onDisconnected
     * @property {(arg0:{childElement:HTMLElement,ForController:For,attributeName:string, newValue:string})=>Promise<void>} childLifeCycleCallback.onAttributeChanged
     */
    /**
     * @param {import('./List.mjs').List} listInstance
     * @param {string} attributeName
     * - parent attributeName
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {import('./documentScope.type.mjs').documentScope} documentScope
     */
    constructor(listInstance: import("./List.mjs").List<any>, attributeName: string, childLifeCycleCallback: {
        onConnected: (arg0: {
            childElement: HTMLElement;
            ForController: For;
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
    listInstance: import("./List.mjs").List<any>;
    /**
     * @type {string}
     */
    attr: string;
    DS: import("./documentScope.type.mjs").documentScope;
    /**
     * @private
     * @param {HTMLElement} parentElement
     * @param {childLifeCycleCallback} childLifeCycleCallback
     * @param {lifecycleHandler["onDisconnected"]} onParentDisconnected
     */
    private onParentConnected;
    parentElement: HTMLElement;
    childElement: Element;
    /**
     * @private
     * @param {childLifeCycleCallback} childLifeCycleCallback
     */
    private childLifecycle;
    /**
     * @private
     * @param {HTMLElement} childElement
     * @returns {number}
     */
    private getChildElementIndex;
    /**
     * @private
     * @param {import('./List.mjs').mutationType} mutationValue
     * @returns {Promise<void>}
     */
    private handleMutationList;
    /**
     * handle append/prepend
     * @private
     * @param {(ListArg)[]} listValue
     * @param {'append'|'prepend'} mode
     */
    private pend;
    /**
     * @private
     * @param {(ListArg)[]} listValue
     */
    private handlePush;
    /**
     * @private
     * @param {(ListArg)[]} listValue
     */
    private handleUnshift;
    /**
     * @private
     * @param {number} start
     * @param {number} end
     */
    private handleSlice;
    /**
     * @private
     * @param {number} start
     * @param {number} end
     */
    private handleSplice;
    /**
     * @private
     * @param {number} indexA
     * @param {number} indexB
     */
    private handleSwap;
    /**
     * @private
     * @param {number} index
     * @param {import('./List.mjs').ListValue} listValue
     * @returns {void}
     */
    private handleModify;
    /**
     * @private
     * @returns {void}
     */
    private handleShift;
}
