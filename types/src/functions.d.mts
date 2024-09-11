export class functions {
    /**
     * timeout
     * @public
     * @param {number} ms
     */
    public static T: (ms: number) => Promise<any>;
    /**
     * is_async
     * @public
     * @param {CallableFunction} callback
     */
    public static IA: (callback: CallableFunction) => boolean;
}
