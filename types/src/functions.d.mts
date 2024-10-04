export class functions {
    /**
     * @param {number} ms
     */
    static timeout: (ms: number) => Promise<any>;
    /**
     * is_async
     * @param {CallableFunction} callback
     */
    static isAsync: (callback: CallableFunction) => boolean;
    /**
     * split with escape string `\`
     * @param {string} string
     * @param {string} delimiter
     */
    static splitX: (string: string, delimiter: string) => string[];
    /**
     * @param {string} attributeName
     * @returns {string}
     */
    static validAttributeNameSelector: (attributeName: string) => string;
}
