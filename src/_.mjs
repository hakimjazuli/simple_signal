// @ts-check

import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { $ } from './$.mjs';
import { List } from './List.mjs';

/**
 * @description
 * - syntax sugar for `signal` based reactifity stored in static Method of class `_`,
 * > - `_.let`: for [new Let](#let);
 * > - `_.let_`: for [Let.dataOnly](#let);
 * > - `_.derived`: for [new Derived](#derived);
 * > - `_.derived_`: for [Derived.dataOnly](#derived);
 * > - `_.$`: for [new $](#$);
 * > - `_.list`: for [new List](#list);
 * - it also shortened by at least 2characters, and since most of our APIs are a class,
 *   `treeshaking` will not uglify the method/property of the class, having it shortedned like this is a plus,
 *   especially if you don't plan on gzipping the file;
 */
export class _ {
	/**
	 * syntax sugar for `Let`
	 * @template V
	 * @param {V} value
	 * @param {string} [attributeName]
	 * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
	 */
	static let = (value, attributeName = undefined, documentScope = undefined) =>
		new Let(value, attributeName, documentScope);
	/**
	 * syntax sugar for `Let.dataOnly`
	 * @template D
	 * @param {D} data
	 * @returns {Let<D>}
	 */
	static let_ = (data) => Let.dataOnly(data);
	/**
	 * syntax sugar for `Derived`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {string} [attributeName]
	 * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
	 */
	static derived = (asyncCallback, attributeName = undefined, documentScope = undefined) =>
		new Derived(asyncCallback, attributeName, documentScope);
	/**
	 * syntax sugar for `Derived.dataOnly`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @returns {Derived<V>}
	 */
	static derived_ = (asyncCallback) => Derived.dataOnly(asyncCallback);
	/**
	 * syntax sugar for `$`
	 * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
	 */
	static $ = (asyncCallback) => new $(asyncCallback);
	/**
	 * syntax sugar for `List`
	 * @template {Record<string, Let<string>>} ListValue
	 * @template {keyof ListKeys} ListKeys
	 * @param {ListValue[]} listArray
	 */
	static list = (listArray) => new List(listArray);
}
