/**
 * @description
 * - scoping helper for `signal` based reactifity stored in static Method of class `_`,
 * > - `_.let`: autoscoped [new Let](#let);
 * > - `_.let_`: for [Let.dataOnly](#let);
 * > - `_.derived`: autoscoped [new Derived](#derived);
 * > - `_.derived_`: for [Derived.dataOnly](#derived);
 * > - `_.$`: for [new $](#$);
 * > - `_.list`: for [new List](#list);
 * - it also shortened by 2characters, and since most of our APIs are a class,
 *   `treeshaking` will not uglify the method/property of the class, having it shortedned like this is a plus,
 *   especially if you don't plan on gzipping the file;
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
     * scoping helper for `Let`
     * @template V
     * @param {V} value
     */
    static let: <V>(value: V) => Let<V>;
    /**
     *syntax sugar for `Let.dataOnly`
     * @template D
     * @param {D} data
     * @returns {Let<D>}
     */
    static let_: <D>(data: D) => Let<D>;
    /**
     * scoping helper for `Derived`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     */
    static derived: <V>(asyncCallback: () => Promise<V>) => Derived<V>;
    /**
     * syntax sugar for `Derived.dataOnly`
     * @template V
     * @param {()=>Promise<V>} asyncCallback
     * @returns {Derived<V>}
     */
    static derived_: <V>(asyncCallback: () => Promise<V>) => Derived<V>;
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
