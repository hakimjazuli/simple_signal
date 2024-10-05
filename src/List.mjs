// @ts-check

import { Let } from './Let.mjs';

/**
 * @description
 * - helper class to create list that satisfy
 * `Array<Record<string, string>>`
 * ```js
 * const listExample = new List([
 *      {key1: "test", ...keys},
 *      {key1: "test3", ...keys},
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
export class List extends Let {
	/**
	 * @private
	 * @param {ListArg} data
	 * @returns {ListValue}
	 */
	static convertSingle = (data) => {
		/**
		 * @type {ListValue}
		 */
		const dataValue = {};
		for (const key in data) {
			dataValue[key] = new Let(data[key]);
		}
		return dataValue;
	};
	/**
	 * @private
	 * @param {ListArg[]} list
	 * @returns {ListValue[]}
	 */
	static convert = (list) => {
		/**
		 * @type {ListValue[]}
		 */
		const listValue = [];
		for (let i = 0; i < list.length; i++) {
			listValue.push(List.convertSingle(list[i]));
		}
		return listValue;
	};
	/**
	 * @param {List_[]} value
	 */
	constructor(value) {
		super(List.convert(value));
	}
	/**
	 * @type {Let<mutationType>}
	 */
	mutation = new Let({ type: '', args: [] });
	/**
	 * Appends new data to the end;
	 * @param {...List_} listValue
	 */
	push = (...listValue) => {
		this.value.push(...List.convert(listValue));
		this.call$();
		this.mutation.value = {
			type: 'push',
			args: [listValue],
		};
	};
	/**
	 * Removes the first data;
	 */
	shift = () => {
		this.value.shift();
		this.call$;
		this.mutation.value = {
			type: 'shift',
			args: [],
		};
	};
	/**
	 * Inserts new data at the start;
	 * @param  {...List_} listValue
	 */
	unshift = (...listValue) => {
		this.value.unshift(...List.convert(listValue));
		this.call$();
		this.mutation.value = {
			type: 'unshift',
			args: [listValue],
		};
	};
	/**
	 * removeEffectFromChild
	 * @private
	 * @param {number} index
	 * @returns {void}
	 */
	removeEffectFromChild = (index) => {
		const data = this.value[index];
		for (const key in data) {
			data[key].unRef();
			delete data[key];
		}
	};
	/**
	 * For both start and end, a negative index can be used to indicate an offset from the end of the data. For example, -2 refers to the second to last element of the data.
	 * @param {number} [start]
	 * The beginning index of the specified portion of the data. If start is undefined, then the slice begins at index 0.
	 * @param {number} [end]
	 * The end index of the specified portion of the data. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the data.
	 */
	slice = (start = undefined, end = undefined) => {
		this.value.slice(start, end);
		start = start ?? 0;
		end = end ?? this.value.length;
		this.call$();
		for (let i = start; i < end; i++) {
			this.removeEffectFromChild(i);
		}
		this.mutation.value = {
			type: 'slice',
			args: [start, end],
		};
	};
	/**
	 * Replace whole `List` value with new array.
	 * @param {List_[]} newList
	 * - new array in place of the deleted array.
	 */
	replace = (newList) => {
		this.splice(0, this.value.length, ...newList);
	};
	/**
	 * Removes elements from an data and, if necessary, inserts new elements in their place;
	 * @param {number} start
	 * - The zero-based location in the data from which to start removing elements.
	 * @param {number} deleteCount
	 * -The number of elements to remove.
	 * @param {...List_} insertNew
	 * - new data in place of the deleted data.
	 */
	splice = (start, deleteCount, ...insertNew) => {
		const end = start + deleteCount;
		for (let i = start; i < end; i++) {
			this.removeEffectFromChild(i);
		}
		const deletedArray = this.value.splice(start, deleteCount, ...List.convert(insertNew));
		this.call$();
		this.mutation.value = {
			type: 'splice',
			args: [start, deleteCount],
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
	 * @param {Partial<List_>} listValue
	 * @returns {void}
	 */
	modify = (index, listValue) => {
		this.value[index] = List.convertSingle(listValue);
		this.call$();
		this.mutation.value = {
			type: 'modify',
			args: [index, listValue],
		};
	};
}
