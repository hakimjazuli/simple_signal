export class queueObjectFIFO {
    /**
     * @param {()=>(any|Promise<any>)} callback
     * @param {number|false} [debounce]
     * - in ms
     */
    constructor(callback: () => (any | Promise<any>), debounce?: number | false);
    /**
     * details
     * @type {[callback:()=>(any|Promise<any>),debounce:(number|false)]}
     */
    D: [callback: () => (any | Promise<any>), debounce: (number | false)];
}
