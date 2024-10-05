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
export class List {
	/**
	 * proxy instance
	 * @type {Let<ListValue[]>}
	 */
	proxyInstance;
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
		this.proxyInstance = new Let(List.convert(value));
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
		this.proxyInstance.value.push(...List.convert(listValue));
		this.proxyInstance.call$();
		this.mutation.value = {
			type: 'push',
			args: [listValue],
		};
	};
	/**
	 * Removes the first data;
	 */
	shift = () => {
		this.proxyInstance.value.shift();
		this.proxyInstance.call$;
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
		this.proxyInstance.value.unshift(...List.convert(listValue));
		this.proxyInstance.call$();
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
		const data = this.proxyInstance.value[index];
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
		this.proxyInstance.value.slice(start, end);
		start = start ?? 0;
		end = end ?? this.proxyInstance.value.length;
		this.proxyInstance.call$();
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
		this.splice(0, this.proxyInstance.value.length, ...newList);
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
		const deletedArray = this.proxyInstance.value.splice(
			start,
			deleteCount,
			...List.convert(insertNew)
		);
		this.proxyInstance.call$();
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
		[this.proxyInstance.value[indexA], this.proxyInstance.value[indexB]] = [
			this.proxyInstance.value[indexB],
			this.proxyInstance.value[indexA],
		];
		this.proxyInstance.call$();
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
		this.proxyInstance.value[index] = List.convertSingle(listValue);
		this.proxyInstance.call$();
		this.mutation.value = {
			type: 'modify',
			args: [index, listValue],
		};
	};
}
