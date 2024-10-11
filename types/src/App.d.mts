/**
 * @description
 * `App` starter helper for module environtment;
 * the sole purpose is just to auto import the necessary file in your main js file;
 */
export class App {
    /**
     * @type {App}
     */
    static __: App;
    /**
     * @param {Object} options
     * @param {import('./Component.mjs').Component} [options.rootComponent] -
     * - for efficiency, only fill this option when you intent to use the library as sole `View` part of your stack;
     * - the inputed root component must manually fills attributeName option argument, to target root element on the real dom;
     * @param {(import("./Lifecycle.mjs").Lifecycle)[]} [options.lifecycles]
     * @param {(import("./For.mjs").For)[]} [options.forS]
     * @param {import('./DefineShortCuts.mjs').DefineShortCuts} [options.definedShortcuts]
     * @param {import('./DefineQRouter.mjs').DefineQRouter} [options.definedQRouter]
     * @param {import('./DefineStorage.mjs').DefineStorage} [options.definedStorage]
     * @param {import('./DefinePageTemplate.mjs').DefinePageTemplate} [options.definePageTemplate]
     */
    constructor({ lifecycles, forS, rootComponent, definedShortcuts, definedQRouter, definedStorage, definePageTemplate, }: {
        rootComponent?: import("./Component.mjs").Component<any, any>;
        lifecycles?: (import("./Lifecycle.mjs").Lifecycle)[];
        forS?: (import("./For.mjs").For)[];
        definedShortcuts?: import("./DefineShortCuts.mjs").DefineShortCuts<any, any>;
        definedQRouter?: import("./DefineQRouter.mjs").DefineQRouter<any, any>;
        definedStorage?: import("./DefineStorage.mjs").DefineStorage<any, any, any, any>;
        definePageTemplate?: import("./DefinePageTemplate.mjs").DefinePageTemplate;
    });
}
