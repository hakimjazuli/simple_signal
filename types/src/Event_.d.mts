/**
 * @description
 * use this instead of normal `eventListener` declaration for:
 * - creating `autoqueued` `listener`;
 * - `autoScope` `_` static methods, inside `Component` scope;
 * ```js
 * // @ts-check
 * someObject.addEventListener('click', Event_.listener( (event) => {
 * // code
 * }))
 * ```
 */
export class Event_ {
    /**
     * @param {(event:Event)=>Promise<any>} scopedCallback
     * @returns {(event:Event)=>void}
     * - `autoqueued` & `autoScoped` callback
     */
    static listener: (scopedCallback: (event: Event) => Promise<any>) => (event: Event) => void;
}
