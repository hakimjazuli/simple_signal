export type attributeChangedLifecycle = (options: {
    attributeName: string;
    newValue: string;
}) => Promise<void>;
export type lifecycleHandler = {
    element: HTMLElement;
    lifecycleObserver: Lifecycle;
    onConnected: (arg0: () => Promise<void>) => void;
    onDisconnected: (arg0: () => Promise<void>) => void;
    onAttributeChanged: (arg0: attributeChangedLifecycle) => void;
};
import { Lifecycle } from './Lifecycle.mjs';
