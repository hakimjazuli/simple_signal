// @ts-check

import { _ } from './_.mjs';
import { helper } from './helper.mjs';
import { Let } from './Let.mjs';
import { Lifecycle } from './Lifecycle.mjs';
import { Ping } from './Ping.mjs';

/**
 * @description
 * component creation helper using class initiation;
 * behaviour:
 * - it rendered directly to real DOM;
 * > - library like `bootstrap` `css` and it's `js` parts can select your `elements` for it's functionality;
 * > - you have to manually scope your style by
 * ```js
 * // on Component scope
 * html`<style>
 *		[${thisInstance.attr}]{
 *			...nestedCSSRules
 *		}
 * </style>
 * ...
 * `
 * ```
 * > - also you might need to explicitly use ">" `directChildOf` selector, as when you try to render `childComponent`
 * > - it could also be accidentally selected;
 * - render method:
 * > - you put returned value of `thisInstance.attr` on an html element, which
 * > - it will be rendered as it's `innerHTML` at the `onConnected` event, then
 * > - it will used `MutationObserver` to look for changes;
 */
/**
 * @template {{[PropName:string]:string}} DefaultProps
 * @template {keyof DefaultProps} PropName
 */
export class Component {
	/**
	 * @typedef {Object} onConnectedOptions
	 * @property {Record<PropName, Let<string>>} reactiveProps
	 * @property {string} attr
	 * @property {HTMLElement} element
	 * @property {(strings:TemplateStringsArray,...values:string[])=>void} html
	 * - template literal to create `innerHTML` of the component;
	 * @property {(onDC:()=>Promise<void>)=>void} onDisconnected
	 * @property {Lifecycle} componentLifecycle
	 * @param {Object} options
	 * @param {(options:onConnectedOptions)=>Promise<void>} [options.onConnected]
	 * @param {DefaultProps} [options.props]
	 * @param {string} [options.attributeName]
	 */
	constructor({
		onConnected: onConnectedCallback,
		// @ts-ignore
		props = {},
		attributeName = helper.attributeIndexGenerator(),
	}) {
		this.attr = attributeName;
		new Lifecycle(
			{
				[attributeName]: ({
					element,
					lifecycleObserver: componentLifecycle,
					onAttributeChanged,
					onConnected,
					onDisconnected,
				}) => {
					if (onConnectedCallback) {
						onConnected(async () => {
							/**
							 * @type {onConnectedOptions["reactiveProps"]}
							 */
							// @ts-ignore
							const reactiveProps = {};
							for (const propName in props) {
								const value =
									element.getAttribute(propName) ?? props[propName.toString()];
								reactiveProps[propName.toString()] = new Let(
									value,
									propName,
									element
								);
							}
							await onConnectedCallback({
								reactiveProps,
								attr: attributeName,
								element,
								html: (strings, ...values) => {
									const result = [];
									for (let i = 0; i < strings.length; i++) {
										result.push(strings[i]);
										if (i < values.length) {
											result.push(values[i]);
										}
									}
									element.innerHTML = result.join('');
								},
								onDisconnected: (onDCed) => {
									onDisconnected(onDCed);
								},
								componentLifecycle,
							});
							onAttributeChanged(async ({ attributeName, newValue }) => {
								if (!(attributeName in props)) {
									return;
								}
								reactiveProps[attributeName].value = newValue;
							});
						});
					}
				},
			},
			helper.currentDocumentScope
		);
		/**
		 * @param {Partial<DefaultProps>} [props__]
		 * @returns {string}
		 */
		this.attr = (props__) => {
			const props___ = Object.assign(props, props__);
			let props_ = [];
			for (const propName in props___) {
				props_.push(`${propName}="${props___[propName]}"`);
			}
			return `${attributeName}="" ${props_.join(' ')}`;
		};
	}
	/**
	 * @param {Partial<DefaultProps>} props__
	 * @returns {string}
	 */
	attr;
}
