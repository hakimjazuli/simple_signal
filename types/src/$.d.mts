export class $ {
    /**
     * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
     */
    constructor(asyncCallback: (isAtInitialization: boolean) => Promise<void>);
    E: (isAtInitialization: boolean) => Promise<void>;
    /**
     * @private
     */
    private first;
}
