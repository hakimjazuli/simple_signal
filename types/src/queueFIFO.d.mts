export class queueFIFO {
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
    public A: (_queue: queueObjectFIFO) => void;
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
import { queueObjectFIFO } from './queueObjectFIFO.mjs';
