// @ts-check

import { Let } from './Let.mjs';
import { Derived } from './Derived.mjs';
import { $ } from './$.mjs';
import { List } from './List.mjs';
import { helper } from './helper.mjs';

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
	static let = (value, attributeName = undefined, documentScope = undefined) =>
		new Let(value, attributeName, documentScope);
	/**
	 * scoping helper for `Let`
	 * @template V
	 * @param {V} value
	 */
	static let_ = (value) =>
		new Let(value, helper.attributeIndexGenerator(), helper.currentDocumentScope);
	/**
	 * syntax sugar for `Let.dataOnly`
	 * @template D
	 * @param {D} data
	 * @returns {Let<D>}
	 */
	static letD = (data) => Let.dataOnly(data);
	/**
	 * scoping helper for `Derived`
	 * @template  V
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {string} [attributeName]
	 * @param {import('./documentScope.type.mjs').documentScope} [documentScope]
	 */
	static derived = (asyncCallback, attributeName = undefined, documentScope = undefined) =>
		new Derived(asyncCallback, attributeName, documentScope);
	/**
	 * scoping helper for `Derived`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 */
	static derived_ = (asyncCallback) =>
		new Derived(asyncCallback, helper.attributeIndexGenerator(), helper.currentDocumentScope);
	/**
	 * syntax sugar for `Derived.dataOnly`
	 * @template V
	 * @param {()=>Promise<V>} asyncCallback
	 * @returns {Derived<V>}
	 */
	static derivedD = (asyncCallback) => Derived.dataOnly(asyncCallback);
	/**
	 * scoping helper for `$`
	 * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
	 */
	static $ = (asyncCallback) => new $(asyncCallback);
	/**
	 * scoping helper for `List`
	 * @template {Record<string, string>} ListArg
	 * @template {keyof ListKeys} ListKeys
	 * @param {ListArg[]} listArray
	 */
	static list = (listArray) => new List(listArray);
	// static use = (lifecycle, element)=> {}
}
