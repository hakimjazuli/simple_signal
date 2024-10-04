export class queueFIFO {
    /**
     * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
     */
    /**
     * @private
     * @type {queueObjectFIFO['details'][]}
     */
    private queue;
    /**
     * @private
     * @type {boolean}
     */
    private isRunning;
    /**
     * @param {queueObjectFIFO} _queue
     */
    assign: (_queue: import("./queueObjectFIFO.mjs").queueObjectFIFO) => void;
    /**
     * @private
     * @param {queueObjectFIFO} _queue
     */
    private push;
    /**
     * @private
     */
    private run;
}
