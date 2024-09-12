/**
 * @template V
 */
export class Let<V> {
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
     * subscription
     * @private
     * @type {((isAtInitialization:boolean)=>Promise<void>)[]}
     */
    private S;
    /**
     * remove effect
     * @param {$} $
     * @return {void}
     */
    remove$: ($: $) => void;
    /**
     * value placeholder
     * @private
     * @type {V}
     */
    private V_;
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
