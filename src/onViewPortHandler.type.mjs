// @ts-check

import { Lifecycle } from './Lifecycle.mjs';
import { OnViewPort } from './OnViewPort.mjs';

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
