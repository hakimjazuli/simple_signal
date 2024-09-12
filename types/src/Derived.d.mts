/**
 * @template V
 */
export class Derived<V> extends Let<any> {
    /**
     * @param {()=>Promise<V>} asyncCallback
     * @param {string} [attributeName]
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    constructor(asyncCallback: () => Promise<V>, attributeName?: string, documentScope?: import("./documentScope.type.mjs").documentScope);
}
import { Let } from './Let.mjs';
