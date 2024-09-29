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
     * signal with value as target
     * @readonly
     */
    static readonly V: "hf_ss-b-a-val";
    /**
     * storage identifier
     * @readonly
     */
    static readonly SI: "hf_ss-b-store";
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
    static readonly FCA: "hf_ss-fc-";
    /**
     * globalSignalPrefix
     * @readonly
     */
    static readonly G: "g-";
    /**
     * @param {Object} class_
     */
    static warningSingleton: (class_: any) => void;
    /**
     * @private
     */
    private static generateUniqueString;
    /**
     * @type {string|null}
     */
    static attr: string | null;
    /**
     * @type {import('./documentScope.type.mjs').documentScope}
     */
    static currentDocumentScope: import("./documentScope.type.mjs").documentScope;
    /**
     * @private
     * @type {string}
     */
    private static attrPrefix;
    /**
     * @return {string|null}
     */
    static attributeIndexGenerator: () => string | null;
}
import { queueFIFO } from './queueFIFO.mjs';
