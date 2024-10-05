/**
 * @description
 * `signal` based reactivity;
 * assigning newValue to Let insance:
 * ```js
 * const letSingle = new Let(1, ...args);
 * letSingle.value++; // 2;
 * letSingle.value = 3 // 3;
 * ```
 * `dataOnly`:
 * ```js
 * const dataOnlyExample = Let.dataOnly(args0);
 * ```
 * - `methods`:
 * > - `call$`: manually triggers `effects` subscribed to `thisInstance`;
 * > - `remove$`: unubscribe `thisInstance` from specific `effect`;
 * > - `removeAll$`: unubscribe `thisInstance` from all of its `effects`;
 */
/**
 * @template V
 */
export class Let<V> {
    /**
     * @private
     * @param {any} val
     * @param {string} attributeName
     * @param {HTMLElement} element
     * @param {import('./Let.mjs').Let} letObject
     * @returns {void}
     */
    private static domReflector;
    /**
     * @template V
     * @param {V} data
     * @returns {Let<V>}
     */
    static dataOnly: <V_1>(data: V_1) => Let<V_1>;
    /**
     * @param {V} value
     * @param {string} [attributeName]
     * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
     */
    constructor(value: V, attributeName?: string, documentScope?: import("./documentScope.type.mjs").documentScope);
    /**
     * remove all effects
     * @return {void}
     */
    removeAll$: () => void;
    /**
     * @private
     * @type {((isAtInitialization:boolean)=>Promise<void>)[]}
     */
    private subscription;
    /**
     * remove effect
     * @param {$} $
     * @return {void}
     */
    remove$: ($: $) => void;
    /**
     * destroy all props
     */
    unRef: () => void;
    /**
     * @private
     * @type {V}
     */
    private value_;
    /**
     * @type {undefined|string}
     */
    attr: undefined | string;
    call$: () => void;
    /**
     * @param {V} newValue
     */
    set value(newValue: V);
    /**
     * @returns {V}
     */
    get value(): V;
}
import { $ } from './$.mjs';
