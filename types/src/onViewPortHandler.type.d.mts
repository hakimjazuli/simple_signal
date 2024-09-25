export type onViewPortHandlerDisconnector = {
    element: HTMLElement | Element;
    onViewPortObserver: OnViewPort;
    lifecycleObserver: Lifecycle;
};
export type onViewPortHandler = {
    onViewPort: (options: onViewPortHandlerDisconnector) => Promise<void>;
    onExitingViewPort: (options: onViewPortHandlerDisconnector) => Promise<void>;
    onDisconnected: (options: onViewPortHandlerDisconnector) => Promise<void>;
};
import { OnViewPort } from './OnViewPort.mjs';
import { Lifecycle } from './Lifecycle.mjs';
