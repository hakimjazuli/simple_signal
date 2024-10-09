export type documentScope = HTMLElement | Element | ShadowRoot | Document;
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
import { $ } from './src/$.mjs';
import { Animation } from './src/Animation.mjs';
import { App } from './src/App.mjs';
import { Component } from './src/Component.mjs';
import { CRUD } from './src/CRUD.mjs';
import { DefinePageTemplate } from './src/DefinePageTemplate.mjs';
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
export { $, Animation, App, Component, CRUD, DefinePageTemplate, DefineQRouter, DefineShortCuts, DefineStorage, Derived, Event_, For, Let, Lifecycle, List, OnViewPort, Ping, ShortCut, WorkerMainThread, WorkerThread, _ };
