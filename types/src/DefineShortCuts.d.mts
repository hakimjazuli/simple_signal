/**
 * @description
 * create shortcuts through class instantiation;
 * - register by putting import this instance on your js `main file`
 */
/**
 * @template {{
 * [shortcutName:string]: ShortCut
 * }} namedShortCut
 * @template {Extract<keyof namedShortCut, string>} ShortCutName
 */
export class DefineShortCuts<namedShortCut extends {
    [shortcutName: string]: ShortCut;
}, ShortCutName extends Extract<keyof namedShortCut, string>> {
    /**
     * @type {DefineShortCuts}
     */
    static __: DefineShortCuts<any, any>;
    /**
     * @param {namedShortCut} shortcutList
     */
    constructor(shortcutList: namedShortCut);
    /**
     * @type {Record.<ShortCutName, import("./ShortCut.mjs").ShortCut>}
     */
    SC: Record<ShortCutName, import("./ShortCut.mjs").ShortCut>;
}
import { ShortCut } from './ShortCut.mjs';
