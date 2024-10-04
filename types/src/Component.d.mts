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
export class Component<DefaultProps extends {
    [PropName: string]: string;
}, PropName extends keyof DefaultProps> {
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
    static manualScope: ({ documentScope, scopedCallback, runCheckAtFirst }: {
        documentScope: import("./documentScope.type.mjs").documentScope;
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["ping"];
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
    static autoScope: ({ scopedCallback, runCheckAtFirst }: {
        scopedCallback: () => Promise<void>;
        runCheckAtFirst: boolean;
    }) => Ping["ping"];
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
     * @param {import('./documentScope.type.mjs').documentScope} [options.documentScope]
     */
    constructor({ onConnected: onConnectedCallback, props, attributeName, documentScope, }: {
        onConnected?: (options: {
            reactiveProps: Record<PropName, Let<string>>;
            attr: string;
            element: HTMLElement;
            /**
             * - template literal to create `innerHTML` of the component;
             */
            html: (strings: TemplateStringsArray, ...values: string[]) => void;
            onDisconnected: (onDC: () => Promise<void>) => void;
            componentLifecycle: Lifecycle;
        }) => Promise<void>;
        props?: DefaultProps;
        attributeName?: string;
        documentScope?: import("./documentScope.type.mjs").documentScope;
    });
    /**
     * @param {Partial<DefaultProps>} props__
     * @returns {string}
     */
    attr: (props__?: Partial<DefaultProps>) => string;
}
import { Ping } from './Ping.mjs';
import { Let } from './Let.mjs';
import { Lifecycle } from './Lifecycle.mjs';
