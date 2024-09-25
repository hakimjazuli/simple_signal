/**
 * @description
 * -`signal` based reactivity, wich value are derived from reacting to [`Let<T>.value`](#let) effects that are called in the `asyncCallback` this class instantiation;
 * ```js
 * // @ts-check
 * const letSingle = new Let(1);
 * const doubleExample = new Derived(async()=>{
 * 	const value = letSingle.value; // autoscubscribed to `letSingle` value changes;
 * return value * 2; // returned value are to be derivedValue
 * });
 * ```
 * - `dataOnly`:
 * ```js
 * const dataOnlyExample = Derived.dataOnly(asyncCallback);
 * ```
 * > - this will automatically opt you out from `domReflector`;
 * - make sure to check `argument` documentation in your `IDE` `typehint`;
 */
/**
 * @template V
 */
export class Derived<V> extends Let<any> {
    /**
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     * @returns {Derived<V>}
     */
    static dataOnly: <V_1>(asyncCallback: () => Promise<V_1>) => Derived<V_1>;
    /**
     * @param {()=>Promise<V>} asyncCallback
     * @param {string} [attributeName]
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    constructor(asyncCallback: () => Promise<V>, attributeName?: string, documentScope?: import("./documentScope.type.mjs").documentScope);
}
import { Let } from './Let.mjs';
