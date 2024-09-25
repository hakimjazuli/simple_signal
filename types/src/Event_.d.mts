/**
 * @description
 * `eventListener` helper to create `autoqueued` callback;
 * ```js
 * // @ts-check
 * someObject.addEventListener('click', Event_.listener( (event) => {
 * // code
 * }))
 * ```
 */
export class Event_ {
    /**
     * @param {(event:Event)=>Promise<any>} asyncCallback
     * @returns {(event:Event)=>void}
     * - `autoqueued` callback
     */
    static listener: (asyncCallback: (event: Event) => Promise<any>) => (event: Event) => void;
}
