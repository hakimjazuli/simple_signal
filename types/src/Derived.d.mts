/**
 * @template V
 */
export class Derived<V> extends Let<any> {
    /**
     * @param {()=>Promise<V>} asyncCallback
     * @param {string} [attributeName]
     * @param {import('./documentScope.types.mjs').documentScope} [documentScope]
     */
    constructor(asyncCallback: () => Promise<V>, attributeName?: string, documentScope?: import('./documentScope.types.mjs').documentScope);
}
import { Let } from "./Let.mjs";
