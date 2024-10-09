export class mutaitonObserver {
    /**
     * @typedef {import('./documentScope.type.mjs').documentScope} documentScope
     * @typedef {import('./Let.mjs').Let<MutationRecord[]>} mutationRecordSignal
     * @typedef {[MutationObserver,
     * mutationRecordSignal,
     * documentScope,
     * ]} documentScopedReturn
     */
    /**
     * @private
     * @type {documentScopedReturn[]}
     */
    private static registeredDocumentScope;
    /**
     * @param {documentScope} documentScope
     * @return {documentScopedReturn}
     */
    static create: (documentScope: import("./documentScope.type.mjs").documentScope) => [MutationObserver, Let<MutationRecord[]>, import("./documentScope.type.mjs").documentScope];
}
import { Let } from './Let.mjs';
