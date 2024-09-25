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
     * Description
     * @param {Object} options
     * @param {(import("./Lifecycle.mjs").Lifecycle)[]} [options.lifecycles]
     * @param {(import("./For.mjs").For)[]} [options.for_]
     * @param {import('./DefineShortCuts.mjs').DefineShortCuts} [options.definedShortcuts]
     * @param {import('./DefineQRouter.mjs').DefineQRouter} [options.definedQRouter]
     * @param {import('./DefineStorage.mjs').DefineStorage} [options.definedStorage]
     */
    constructor({ lifecycles, for_, definedShortcuts, definedQRouter, definedStorage }: {
        lifecycles?: (import("./Lifecycle.mjs").Lifecycle)[];
        for_?: (import("./For.mjs").For)[];
        definedShortcuts?: import("./DefineShortCuts.mjs").DefineShortCuts<any, any>;
        definedQRouter?: import("./DefineQRouter.mjs").DefineQRouter<any, any>;
        definedStorage?: import("./DefineStorage.mjs").DefineStorage<any, any, any, any>;
    });
}
