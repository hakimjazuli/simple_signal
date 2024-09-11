/**
 * @template V
 */
export class Derived<V> extends Let<any> {
    /**
     * @param {()=>Promise<V>} asyncCallback
     * @param {string} [attributeName]
     * @param {import("../indexPreBuild.mjs").documentScope} [documentScope]
     */
    constructor(asyncCallback: () => Promise<V>, attributeName?: string, documentScope?: any);
}
import { Let } from "./Let.mjs";
