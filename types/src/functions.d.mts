export class functions {
    /**
     * timeout
     * @param {number} ms
     */
    static T: (ms: number) => Promise<any>;
    /**
     * is_async
     * @param {CallableFunction} callback
     */
    static IA: (callback: CallableFunction) => boolean;
    /**
     * split with escape string `\`
     * @param {string} string
     * @param {string} delimiter
     */
    static splitX: (string: string, delimiter: string) => string[];
    /**
     * validAttributeNameSelector
     * @param {string} attributeName
     * @returns {string}
     */
    static VAS: (attributeName: string) => string;
}
