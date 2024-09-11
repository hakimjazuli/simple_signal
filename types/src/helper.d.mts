/**
 * uses generic class instance instead of const, to track whether there are
 * unnamed property being accessed
 */
export const helper: {
    /**
     * subscriber
     * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
     */
    S: (isAtInitialization: boolean) => Promise<void>;
    QH: queueFIFO;
    /**
     * debounce
     * @type {number|false}
     */
    D: number | false;
    /**
     * attribute helper for binded
     */
    /**
     * @readonly
     */
    readonly P: "hf_ss-binded_viewport";
    /**
     * @readonly
     */
    readonly PX: "hf_ss-binded_viewport_on_exit";
    /**
     * @readonly
     */
    readonly V: "hf_ss-binded_value";
    /**
     * @readonly
     */
    readonly LC: "hf_ss-binded_lifecycle";
};
import { queueFIFO } from "./queueFIFO.mjs";
