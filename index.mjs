// @ts-check

/**
 * generated using:
 * @see {@link https://www.npmjs.com/package/@html_first/js_lib_template | @html_first/js_lib_template}
 * @copyright
 * developed and published under MIT license,
 * @description
 * ## about @html_first/simple_signal v^3.x.x
 * `@html_first/simple_signal` is a collections of helper classes/functions to:
 * -   create `web app` that are based on `signal` paradigm;
 * > -   reactive;
 * > -   declarative;
 * > -   auto subscribed reactivity;
 * > -   true fine grained DOM reflection (that's right, on `v3` there's no catch, it's now truely fine grained);
 * -   create declarative library (using our `Lifecycle`) that are heavily scoped on
 * `window.document`, use cases likes:
 * > -   for backend centric `HATEOAS` paradigm, by assigning `attributeName` (on the html response
 * >     from the server) to be monitored right after the response is connected to the DOM;
 * > -   `htmlFirst` approach, by assigning `attributeName` coupled with other `attributeName` and
 * >     or `attributeValue`, to control how an element should behave, directly from `html`;
 * ## how to install
 * ```sh
 * npm i @html_first/simple_signal
 * ```
 * ```js
 * // @ts-check
 * import {
 * ...namedExports
 * } from '@html_first/simple_signal';
 * ```
 * ## on v^3
 * - we ends the support for `prebundled` module in the reason of, most of the `insteresting` parts of this
 *   library are need to be typehinted, and that's almost impossible in the prebundled environtment
 * - however it's not that hard if you want to bundle it your self, as we have documented our APIs, so
 *   you can import whichever API you want and then expose it in the `window` object
 */

import { $ } from './src/$.mjs';
import { Animation } from './src/Animation.mjs';
import { App } from './src/App.mjs';
import { DefineQRouter } from './src/DefineQRouter.mjs';
import { DefineShortCuts } from './src/DefineShortCuts.mjs';
import { DefineStorage } from './src/DefineStorage.mjs';
import { Derived } from './src/Derived.mjs';
import { Event_ } from './src/Event_.mjs';
import { For } from './src/For.mjs';
import { Let } from './src/Let.mjs';
import { Lifecycle } from './src/Lifecycle.mjs';
import { List } from './src/List.mjs';
import { OnViewPort } from './src/OnViewPort.mjs';
import { Ping } from './src/Ping.mjs';
import { ShortCut } from './src/ShortCut.mjs';
import { WorkerMainThread } from './src/WorkerMainThread.mjs';
import { WorkerThread } from './src/WorkerThread.mjs';
import { _ } from './src/_.mjs';

/**
 * @description
 * type helper for `documentScope`
 */
/**
 * @typedef {ShadowRoot|Document} documentScope
 */
/**
 * @description
 * type helper for `lifecycleHandler` & `attributeChangedLifecycle`
 */
/**
 * @typedef {(options:{attributeName:string, newValue:string})=>Promise<void>} attributeChangedLifecycle
 * @typedef {Object} lifecycleHandler
 * @property {HTMLElement} lifecycleHandler.element
 * @property {Lifecycle} lifecycleHandler.lifecycleObserver
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onConnected
 * @property {(arg0:()=>Promise<void>)=>void} lifecycleHandler.onDisconnected
 * @property {(arg0:attributeChangedLifecycle)=>void} lifecycleHandler.onAttributeChanged
 */
/**
 * @description
 * type helper for `onViewPortHandler`
 */
/**
 * @typedef {Object} onViewPortHandlerDisconnector
 * @property {HTMLElement|Element} element
 * @property {OnViewPort} onViewPortObserver
 * @property {Lifecycle} lifecycleObserver
 * @typedef {Object} onViewPortHandler
 * @property {(options:onViewPortHandlerDisconnector)=>Promise<void>} onViewPortHandler.onViewPort
 * @property {(options:onViewPortHandlerDisconnector)=>Promise<void>} onViewPortHandler.onExitingViewPort
 * @property {(options:onViewPortHandlerDisconnector)=>Promise<void>} onViewPortHandler.onDisconnected
 */

export { $, Animation, App, DefineQRouter, DefineShortCuts, DefineStorage, Derived, Event_, For, Let, Lifecycle, List, OnViewPort, Ping, ShortCut, WorkerMainThread, WorkerThread, _ };