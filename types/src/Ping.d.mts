export class Ping {
    /**
     * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
     */
    constructor(asyncCallbackWhenPinged: (isAtInitisalization: boolean) => Promise<void>);
    /**
     * async callback when pinged
     * @private
     * @type {(isAtInitisalization:boolean)=>Promise<void>}
     */
    private AC;
    /**
     * @param {boolean} first
     */
    ping: (first?: boolean) => void;
}
