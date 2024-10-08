/**
 * @description
 * CRUD wrapper class;
 * - `signal` will be updated from returned value of `read`;
 * - `read` will be called after calling `thisInstance`.`create`/`update`/`delete_`,
 *    that have `true` `refreshSignal`;
 *
/**
 * @template V
 */
export class CRUD<V> {
    /**
     * @typedef {{asyncCallback:()=>Promise<void>,refreshSignal:boolean}} asyncCallback
     * @param {Object} options
     * @param {Let<V>|List} options.signal
     * @param {()=>Promise<any>} options.read
     * @param {asyncCallback} [options.create]
     * @param {asyncCallback} [options.update]
     * @param {asyncCallback} [options.delete_]
     */
    constructor({ signal, read, create, update, delete_ }: {
        signal: Let<V> | List<any>;
        read: () => Promise<any>;
        create?: {
            asyncCallback: () => Promise<void>;
            refreshSignal: boolean;
        };
        update?: {
            asyncCallback: () => Promise<void>;
            refreshSignal: boolean;
        };
        delete_?: {
            asyncCallback: () => Promise<void>;
            refreshSignal: boolean;
        };
    });
    /**
     * @type {Ping["ping"]}
     */
    read: Ping["ping"];
    /**
     * @type {Ping["ping"]}
     */
    create: Ping["ping"];
    /**
     * @type {Ping["ping"]}
     */
    update: Ping["ping"];
    /**
     * @type {Ping["ping"]}
     */
    delete: Ping["ping"];
}
import { Ping } from './Ping.mjs';
import { Let } from './Let.mjs';
import { List } from './List.mjs';
