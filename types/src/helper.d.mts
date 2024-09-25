export class helper {
    /**
     * subscriber
     * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
     */
    static S: null | ((isAtInitialization: boolean) => Promise<void>);
    static QH: queueFIFO;
    /**
     * debounce
     * @type {number|false}
     */
    static D: number | false;
    /**
     * attribute helper for binded
     */
    /**
     * @readonly
     */
    static readonly V: "hf_ss-binded_value";
    /**
     * @readonly
     */
    static readonly LC: "hf_ss-binded_lifecycle";
    /**
     * storage identifier
     * @readonly
     */
    static readonly SI: "hf_ss-binded_storage";
    /**
     * disconnected callback identifier
     */
    static DCCBI: string;
    /**
     * attribute change callback identifier
     */
    static ACCBI: string;
    /**
     * onViewCallbackIdentifier
     */
    static VCBI: string;
    /**
     * onExitViewCallbackIdentifier
     */
    static XVCBI: string;
    /**
     * ForChildAttributePrefix
     * @readonly
     */
    static readonly FCA: "hf_ss-child-";
    /**
     * ForAttributePrefix
     * @readonly
     */
    static readonly FA: "for-";
    /**
     * childDerivedBinder
     * use parent `attributeName`
     * - example: `c-parentAttributeName-childAttributeName`
     * @readonly
     */
    static readonly CDB: "c-";
    /**
     * @param {Object} class_
     */
    static warningSingleton: (class_: any) => void;
}
import { queueFIFO } from './queueFIFO.mjs';
