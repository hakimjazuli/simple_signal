export class helper {
    /**
     * subscriber
     * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
     */
    static subscriber: null | ((isAtInitialization: boolean) => Promise<void>);
    static queueHandler: queueFIFO;
    /**
     * @type {number|false}
     */
    static debounce: number | false;
    /**
     * @readonly
     */
    static readonly val: "hf_ss-b-a-val";
    /**
     * @readonly
     */
    static readonly storageIdentifier: "hf_ss-b-store";
    static DCCBIdentifier: string;
    static ACCBIdentifier: string;
    static onViewCBIdentifier: string;
    static onExitViewCBIdentifier: string;
    /**
     * @readonly
     */
    static readonly ForChildAttributePrefix: "hf_ss-fc-";
    /**
     * @readonly
     */
    static readonly globalSignalPrefix: "g-";
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
     * @type {string}
     */
    static slotPrefix: string;
    /**
     * @return {string|null}
     */
    static attributeIndexGenerator: () => string | null;
}
import { queueFIFO } from './queueFIFO.mjs';
