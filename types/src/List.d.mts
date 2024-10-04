/**
 * @description
 * - helper class to create list that satisfy
 * `Array<Record<string, string>>`
 * ```js
 * const listExample = new List([
 *      {key1: new Let("test"), ...keys},
 *      {key1: _.let_("test3"), ...keys},
 * ])
 * ```
 * - usefull for `loops`;
 */
/**
 * @typedef {Record<string, string>} ListArg
 * @typedef {Record<string, Let<string>>} ListValue
 * @typedef {{type:'push'|'unshift'|'slice'|'splice'|'swap'|'modify'|'shift'|'',args:any[]}} mutationType
 */
/**
 * @template {ListArg} List_
 */
export class List<List_ extends ListArg> {
    /**
     * @private
     * @param {ListArg} data
     * @returns {ListValue}
     */
    private static convertSingle;
    /**
     * @private
     * @param {ListArg[]} list
     * @returns {ListValue[]}
     */
    private static convert;
    /**
     * @param {List_[]} value
     */
    constructor(value: List_[]);
    /**
     * proxy instance
     * @type {Let<ListValue[]>}
     */
    proxyInstance: Let<ListValue[]>;
    /**
     * @type {Let<mutationType>}
     */
    mutation: Let<mutationType>;
    /**
     * Appends new data to the end;
     * @param {...List_} listValue
     */
    push: (...listValue: List_[]) => void;
    /**
     * Removes the first data;
     */
    shift: () => void;
    /**
     * Inserts new data at the start;
     * @param  {...List_} listValue
     */
    unshift: (...listValue: List_[]) => void;
    /**
     * removeEffectFromChild
     * @private
     * @param {number} index
     * @returns {void}
     */
    private removeEffectFromChild;
    /**
     * For both start and end, a negative index can be used to indicate an offset from the end of the data. For example, -2 refers to the second to last element of the data.
     * @param {number} [start]
     * The beginning index of the specified portion of the data. If start is undefined, then the slice begins at index 0.
     * @param {number} [end]
     * The end index of the specified portion of the data. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the data.
     */
    slice: (start?: number, end?: number) => void;
    /**
     * Replace whole `List` value with new array.
     * @param {List_[]} newList
     * - new array in place of the deleted array.
     */
    replace: (newList: List_[]) => void;
    /**
     * Removes elements from an data and, if necessary, inserts new elements in their place;
     * @param {number} start
     * - The zero-based location in the data from which to start removing elements.
     * @param {number} deleteCount
     * -The number of elements to remove.
     * @param {...List_} insertNew
     * - new data in place of the deleted data.
     */
    splice: (start: number, deleteCount: number, ...insertNew: List_[]) => ListValue[];
    /**
     * @param {number} indexA
     * @param {number} indexB
     * @returns {void}
     */
    swap: (indexA: number, indexB: number) => void;
    /**
     * @param {number} index
     * @param {Partial<List_>} listValue
     * @returns {void}
     */
    modify: (index: number, listValue: Partial<List_>) => void;
}
export type ListArg = Record<string, string>;
export type ListValue = Record<string, Let<string>>;
export type mutationType = {
    type: "push" | "unshift" | "slice" | "splice" | "swap" | "modify" | "shift" | "";
    args: any[];
};
import { Let } from './Let.mjs';
