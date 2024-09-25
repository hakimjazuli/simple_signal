// @ts-check

import { Let } from './Let.mjs';

/**
 * @description
 * - helper class to create list that satisfy
 * `Array<Record<string, Let<string>>>`
 * ```js
 * const listExample = new List([
 *      {key1: new Let("test"), ...keys},
 *      {key1: _.let("test2"), ...keys},
 *      {key1: _.let_("test3"), ...keys},
 * ])
 * ```
 * - usefull for `loops`;
 */
/**
 * @typedef {Record<string, Let<string>>} ListValue_
 * @typedef {{type:'push'|'unshift'|'slice'|'splice'|'swap'|'modify'|'shift'|'',args:any[]}} mutationType
 */
/**
 * @template {ListValue_} ListValue
 * @template {keyof ListKeys} ListKeys
 * @template {ListValue[]} ListArray
 * @extends {Let<ListArray>}
 */
export class List extends Let {
	/**
	 * @param {ListArray} value
	 */
	constructor(value) {
		super(value);
	}
	/**
	 * @type {Let<mutationType>}
	 */
	mutation = new Let({ type: '', args: [] });
	/**
	 * Appends new elements to the end of an array, and returns the new length of the array.
	 * @param {...ListValue} listValue
	 * - New elements to add to the array.
	 * @returns {number}
	 */
	push = (...listValue) => {
		const newLength = this.value.push(...listValue);
		this.call$();
		this.mutation.value = {
			type: 'push',
			args: [listValue],
		};
		return newLength;
	};
	/**
	 * Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
	 * @returns {ListValue|undefined}
	 */
	shift = () => {
		const firstList = this.value.shift();
		this.call$;
		this.mutation.value = {
			type: 'shift',
			args: [],
		};
		return firstList;
	};
	/**
	 * Inserts new elements at the start of an array, and returns the new length of the array.
	 * @param  {...ListValue} listValue
	 * - Elements to insert at the start of the array.
	 * @returns
	 */
	unshift = (...listValue) => {
		const newLength = this.value.unshift(...listValue);
		this.call$();
		this.mutation.value = {
			type: 'unshift',
			args: [listValue],
		};
		return newLength;
	};
	/**
	 * removeEffectFromChild
	 * @private
	 * @param {number} index
	 * @param {ListArray} listData
	 * @returns {void}
	 */
	REC = (index, listData) => {
		const data = listData[index];
		for (const key in data) {
			data[key].unRef();
			data[key] = null;
			delete data[key];
		}
	};
	/**
	 * For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.
	 * @param {number} [start]
	 * The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.
	 * @param {number} [end]
	 * The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
	 * @returns {ListValue[]}
	 * copy of a section of an array.
	 */
	slice = (start = undefined, end = undefined) => {
		const newArray = this.value.slice(start, end);
		this.call$();
		const datas = this.value;
		for (let i = start; i < end; i++) {
			this.REC(i, datas);
		}
		this.mutation.value = {
			type: 'slice',
			args: [start, end],
		};
		return newArray;
	};
	/**
	 * Replace whole `List` value with new array.
	 * @param {...ListValue} [newList]
	 * - new array in place of the deleted array.
	 * @returns {ListValue[]}
	 * - An array containing the elements that were deleted.
	 */
	replace = (...newList) => {
		return this.splice(0, this.value.length, ...newList);
	};
	/**
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param {number} start
	 * - The zero-based location in the array from which to start removing elements.
	 * @param {number} deleteCount
	 * -The number of elements to remove.
	 * @param {...ListValue} [insertNew]
	 * - new array in place of the deleted array.
	 * @returns {ListValue[]}
	 * - An array containing the elements that were deleted.
	 */
	splice = (start, deleteCount, ...insertNew) => {
		const deletedArray = this.value.splice(start, deleteCount, ...insertNew);
		this.call$();
		const end = start + deleteCount;
		const datas = this.value;
		for (let i = start; i < end; i++) {
			this.REC(i, datas);
		}
		this.mutation.value = {
			type: 'splice',
			args: [start, deleteCount, insertNew],
		};
		return deletedArray;
	};
	/**
	 * @param {number} indexA
	 * @param {number} indexB
	 * @returns {void}
	 */
	swap = (indexA, indexB) => {
		[this.value[indexA], this.value[indexB]] = [this.value[indexB], this.value[indexA]];
		this.call$();
		this.mutation.value = {
			type: 'swap',
			args: [indexA, indexB],
		};
	};
	/**
	 * @param {number} index
	 * @param {ListValue} listValue
	 * @returns {void}
	 */
	modify = (index, listValue) => {
		this.value[index] = listValue;
		this.call$();
		this.mutation.value = {
			type: 'modify',
			args: [index, listValue],
		};
	};
}
