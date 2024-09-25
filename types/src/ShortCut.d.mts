/**
 * @description
 * - helper class to create `ShortCut` through class instantiation;
 * - call `thisInstance.ping` to manually trigger action
 */
export class ShortCut {
    /**
     * @param {Object} options
     * @param {(event:KeyboardEvent)=>boolean} options.action
     * @param {(isAtInitisalization:boolean)=>Promise<void>} options.asyncCallback
     */
    constructor({ action, asyncCallback }: {
        action: (event: KeyboardEvent) => boolean;
        asyncCallback: (isAtInitisalization: boolean) => Promise<void>;
    });
    /**
     * call this method to trigger `asyncCAllback`;
     */
    ping: (first?: boolean) => void;
    /**
     * @private
     */
    private action;
    /**
     * @private
     * @param {KeyboardEvent} event
     */
    private event;
    disable: () => void;
}
