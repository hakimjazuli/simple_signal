export class queueFIFO {
    /**
     * @typedef {import('./queueObjectFIFO.mjs').queueObjectFIFO} queueObjectFIFO
     */
    /**
     * queue
     * @private
     * @type {queueObjectFIFO['D'][]}
     */
    private Q;
    /**
     * is_running
     * @private
     * @type {boolean}
     */
    private IR;
    /**
     * assign
     * @public
     * @param {queueObjectFIFO} _queue
     */
    public A: (_queue: import("./queueObjectFIFO.mjs").queueObjectFIFO) => void;
    /**
     * push
     * @private
     * @param {queueObjectFIFO} _queue
     */
    private P;
    /**
     * run
     * @private
     */
    private R;
}
