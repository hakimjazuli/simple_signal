/**
 * @description
 * - scoping helper for `signal` based reactifity stored in static Method of class `_`;
 * - if you use our `Component` class, use this class static method, instead of their respective class, for `autoscoping`,
 * > which then you can use it's `attr` returned value to mark the element
 * ```js
 * // on Component scope
 * onConnected(async()=>{
 * 	const data = _.let('test');
 * 	html`<div ${data.attr}="innerText"></div>`
 * })
 * ```
 */
export class _ {
    /**
     * syntax sugar for `Let`
     * @template V
     * @param {V} value
     * @param {string} [attributeName]
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    static let: <V>(value: V, attributeName?: string, documentScope?: import("./documentScope.type.mjs").documentScope) => Let<V>;
    /**
     * scoping helper for `Let`
     * @template V
     * @param {V} value
     */
    static let_: <V>(value: V) => Let<V>;
    /**
     * syntax sugar for `Let.dataOnly`
     * @template D
     * @param {D} data
     * @returns {Let<D>}
     */
    static letD: <D>(data: D) => Let<D>;
    /**
     * scoping helper for `Derived`
     * @template  V
     * @param {()=>Promise<V>} asyncCallback
     * @param {string} [attributeName]
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    static derived: <V>(asyncCallback: () => Promise<V>, attributeName?: string, documentScope?: import("./documentScope.type.mjs").documentScope) => Derived<V>;
    /**
     * scoping helper for `Derived`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     */
    static derived_: <V>(asyncCallback: () => Promise<V>) => Derived<V>;
    /**
     * syntax sugar for `Derived.dataOnly`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     * @returns {Derived<V>}
     */
    static derivedD: <V>(asyncCallback: () => Promise<V>) => Derived<V>;
    /**
     * scoping helper for `$`
     * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
     */
    static $: (asyncCallback: (isAtInitialization: boolean) => Promise<void>) => $;
    /**
     * scoping helper for `List`
     * @template {Record<string, string>} ListArg
     * @template {keyof ListKeys} ListKeys
     * @param {ListArg[]} listArray
     */
    static list: <ListArg extends Record<string, string>, ListKeys extends keyof ListKeys>(listArray: ListArg[]) => List<ListArg>;
}
import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { $ } from './$.mjs';
import { List } from './List.mjs';
