// @ts-check

import { helper } from './helper.mjs';
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
 * html`<style>
 *		[${thisInstance.attr}]{
 *			...nestedCSSRules
 *		}
 * </style>`
 * ```
 * > also you might need to explicitly use ">" `directChildOf` selector, as when you try to render `childComponent`
 * > it could also be accidentally selected;
 * - render method:
 * > you put returned value of `thisInstance.componentAttribute` on an html element, which
 * > it will be rendered as it's `innerHTML` at the `onConnected` event, then
 * > it will used `MutationObserver` to look for changes;
 */
/**
 * @template {{[PropName:string]:string}} DefaultProps
 * @template {keyof DefaultProps} PropName
 */
export class Component {
	/**
	 * @typedef {import('./lifecycleHandler.type.mjs').lifecycleHandler} lifecycleHandler
	 */
	/**
	 * @typedef {Object} manualScopeOptions
	 * @property {import('./documentScope.type.mjs').documentScope} documentScope
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 */
	/**
	 * manual scoping for lib internal functionality
	 * @param {manualScopeOptions} options
	 * @returns {Ping["ping"]}
	 */
	static manualScope = ({ documentScope, scopedCallback, runCheckAtFirst }) => {
		return new Ping(runCheckAtFirst, async () => {
			const currentScope = helper.currentDocumentScope;
			helper.currentDocumentScope = documentScope;
			await scopedCallback();
			helper.currentDocumentScope = currentScope;
		}).ping;
	};
	/**
	 * @typedef {Object} autoScopeOptions
	 * @property {()=>Promise<void>} scopedCallback
	 * @property {boolean} runCheckAtFirst
	 */
	/**
	 * use for handling out of scoped codeblock:
	 * @param {autoScopeOptions} options
	 * @return {Ping["ping"]}
	 */
	static autoScope = ({ scopedCallback, runCheckAtFirst }) => {
		const documentScope = helper.currentDocumentScope;
		return Component.manualScope({
			documentScope,
			scopedCallback,
			runCheckAtFirst,
		});
	};
	/**
	 * @typedef {Object} onConnectedOptions
	 * @property {string} attr
	 * @property {HTMLElement} element
	 * @property {(strings:TemplateStringsArray,...values:string[])=>void} html
	 * - template literal to create `innerHTML` of the component;
	 * @property {(onDC:()=>Promise<void>)=>void} onDisconnected
	 * @property {Lifecycle} componentLifecycle
	 * @property {(onAC:(options:{attributeName:PropName, newValue:string})=>Promise<void>)=>void} onAttributeChanged
	 * @param {Object} options
	 * @param {(options:onConnectedOptions)=>Promise<void>} [options.onConnected]
	 * @param {DefaultProps} [options.props]
	 * @param {string} [options.attributeName]
	 * @param {import('./documentScope.type.mjs').documentScope} [options.documentScope]
	 */
	constructor({
		onConnected: onConnectedCallback,
		// @ts-ignore
		props = {},
		/**
		 * make it automatic
		 */
		attributeName = helper.attributeIndexGenerator(),
		/**
		 * make it automatic
		 */
		documentScope = document,
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
							Component.manualScope({
								documentScope: element,
								runCheckAtFirst: true,
								scopedCallback: async () => {
									let onDC = undefined;
									let onAC = undefined;
									let renderHTML = undefined;
									await onConnectedCallback({
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
											renderHTML = () => {
												element.innerHTML = result.join('');
											};
										},
										onDisconnected: (onDisconnected) => {
											onDC = onDisconnected;
										},
										componentLifecycle,
										onAttributeChanged: (onAttributeChanged) => {
											onAC = onAttributeChanged;
										},
									});
									if (onAC) {
										onAttributeChanged(async ({ attributeName, newValue }) => {
											/**
											 * uses function block instead of directly assign;
											 * for a placeholder of additional logic, like autoscoping;
											 */
											if (!(attributeName in props)) {
												return;
											}
											Component.manualScope({
												documentScope: element,
												runCheckAtFirst: true,
												scopedCallback: async () =>
													await onAC({ attributeName, newValue }),
											});
										});
									}
									if (onDC) {
										onDisconnected(async () => {
											Component.manualScope({
												documentScope: element,
												runCheckAtFirst: true,
												scopedCallback: onDC,
											});
										});
									}
									if (renderHTML) {
										// @ts-ignore
										renderHTML();
									}
								},
							});
						});
					}
				},
			},
			documentScope
		);
		/**
		 * @param {Partial<DefaultProps>} props__
		 * @returns {string}
		 */
		this.componentAttribute = (props__) => {
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
	componentAttribute;
}
