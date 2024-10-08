## about @html_first/simple_signal v^3.x.x
`@html_first/simple_signal` is a collections of helper classes/functions to:
-   create `web app` that are based on `signal` paradigm;
> -   reactive;
> -   declarative;
> -   auto subscribed reactivity;
> -   true fine grained DOM reflection (that's right, on `v3` there's no catch, it's now truely fine grained);
-   create declarative library (using our `Lifecycle`) that are heavily scoped on
`window.document`, use cases likes:
> -   for backend centric `HATEOAS` paradigm, by assigning `attributeName` (on the html response
>     from the server) to be monitored right after the response is connected to the DOM;
> -   `htmlFirst` approach, by assigning `attributeName` coupled with other `attributeName` and
>     or `attributeValue`, to control how an element should behave, directly from `html`;
## how to install
```sh
npm i @html_first/simple_signal
```
```js
// @ts-check
import {
...namedExports
} from '@html_first/simple_signal';
```
## on v^3
- we ends the support for `prebundled` module in the reason of, most of the `insteresting` parts of this
  library are need to be typehinted, and that's almost impossible in the prebundled environtment
- however it's not that hard if you want to bundle it your self, as we have documented our APIs, so
  you can import whichever API you want and then expose it in the `window` object


<h2 id="exported-api-and-type-list">exported-api-and-type-list</h2>

- [$](#$)

- [Animation](#animation)

- [App](#app)

- [Component](#component)

- [DefineQRouter](#defineqrouter)

- [DefineShortCuts](#defineshortcuts)

- [DefineStorage](#definestorage)

- [Derived](#derived)

- [documentScope](#documentscope)

- [Event_](#event_)

- [For](#for)

- [Let](#let)

- [Lifecycle](#lifecycle)

- [lifecycleHandler](#lifecyclehandler)

- [List](#list)

- [OnViewPort](#onviewport)

- [onViewPortHandler](#onviewporthandler)

- [Ping](#ping)

- [ShortCut](#shortcut)

- [UsePageTemplate](#usepagetemplate)

- [WorkerMainThread](#workermainthread)

- [WorkerThread](#workerthread)

- [_](#_)

<h2 id="$">$</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

generate side effect for `signal` based reactivity such as for:- [Let](#let)```jsconst letExample = new Let('')new $(async(first)=>{ const value = test.value; if(first){     return;     // return early if you want to opt out from handling the effect immediately,     // also by doing this you can make the `$` slightly more performance 1) when dealing with `async await` on hydration,     // such as data fetching; }     // handle value})// 1) and when all of the effects is registered, you can call `letExample.call$` to call for effect in parallel;```- [Derived](#derived)```js// bassically the same with `Let` but use `new Derived````

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="animation">Animation</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

collections of static methods helper for animation;static method prefixed with `animation` can be used to generate recuring keyframes,which in turn can be used in the callback to animate stuffs

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="app">App</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`App` starter helper for module environtment;the sole purpose is just to auto import the necessary file in your main js file;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="component">Component</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

component creation helper using class initiation;behaviour:- it rendered directly to real DOM;> - library like `bootstrap` `css` and it's `js` parts can select your `elements` for it's functionality;> - you have to manually scope your style by```js// on Component scopehtml`<style>	[${thisInstance.attr}]{		...nestedCSSRules	}</style>````> also you might need to explicitly use ">" `directChildOf` selector, as when you try to render `childComponent`> it could also be accidentally selected;- render method:> you put returned value of `thisInstance.componentAttribute` on an html element, which> it will be rendered as it's `innerHTML` at the `onConnected` event, then> it will used `MutationObserver` to look for changes;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="defineqrouter">DefineQRouter</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

allow the usage of search query based router through class instantiation;- register by putting import this instance on your js `main file`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="defineshortcuts">DefineShortCuts</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

create shortcuts through class instantiation;- register by putting import this instance on your js `main file`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="definestorage">DefineStorage</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

create named storage (`localStorage` or `sessionStorage`) through class instantiation;- register by putting import this instance on your js `main file`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="derived">Derived</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- this class is extended from `Let` [`Let`](#let)-`signal` based reactivity, wich value are derived from reacting to [`Let<T>.value`](#let) effects that are called in the `asyncCallback` this class instantiation;```js// @ts-checkconst letSingle = new Let(1);const doubleExample = new Derived(async()=>{	const value = letSingle.value; // autoscubscribed to `letSingle` value changes;return value * 2; // returned value are to be derivedValue});```- `dataOnly`:```jsconst dataOnlyExample = Derived.dataOnly(asyncCallback);```> - this will automatically opt you out from `domReflector`;- make sure to check `argument` documentation in your `IDE` `typehint`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="documentscope">documentScope</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `documentScope`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="event_">Event_</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

use this instead of normal `eventListener` declaration for:- creating `autoqueued` `listener`;- `autoScope` `_` static methods, inside `Component` scope;```js// @ts-checksomeObject.addEventListener('click', Event_.listener( (event) => {// code}))```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="for">For</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- assign element to loop through ['List'](#list) as data to render child element using class instantiation;- loped childElement:> - must have `HTMLElement` as first children;> - only first children will be used to loop through `List`, all other children will be deleted from the dom before `onConnected` event of parentElement;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="let">Let</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`signal` based reactivity;assigning newValue to Let insance:```jsconst letSingle = new Let(1, ...args);letSingle.value++; // 2;letSingle.value = 3 // 3;````dataOnly`:```jsconst dataOnlyExample = Let.dataOnly(args0);```- `methods`:> - `call$`: manually triggers `effects` subscribed to `thisInstance`;> - `remove$`: unubscribe `thisInstance` from specific `effect`;> - `removeAll$`: unubscribe `thisInstance` from all of its `effects`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="lifecycle">Lifecycle</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to track connected/disconnected/attributeChanged of an element;- all global `signal` with dom relector that need to be available for `parent scope` should be prefixed with `g-`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="lifecyclehandler">lifecycleHandler</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `lifecycleHandler` & `attributeChangedLifecycle`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="list">List</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to create list that satisfy`Array<Record<string, string>>````jsconst listExample = new List([     {key1: "test", ...keys},     {key1: "test3", ...keys},])```- usefull for `loops`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="onviewport">OnViewPort</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

lifecycle wrapper to observe whether element is in viewport

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="onviewporthandler">onViewPortHandler</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `onViewPortHandler`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="ping">Ping</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

trigger based callback integrated to the internal library  queue handler;can be created using class instantiation;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="shortcut">ShortCut</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to create `ShortCut` through class instantiation;- call `thisInstance.ping` to manually trigger action

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="usepagetemplate">UsePageTemplate</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- instantiate this class to opt in page templating, by saving html template string on a html document page;```html// main page<div ${templateName}="${path};${selector}"></div>``````html// template document<div ${targetAttribute}="${selector}"></div>```- how it works:> - the class itself register a `Lifecycle` for `templateName`,    which then upon connected, it will fetch the `path` then selects `targetAttribute`="`selector`"    as template that then replace main page element with selected element from template;> - fetched page will be then be cached, along with any `[targetAttribute]` on that page

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="workermainthread">WorkerMainThread</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

helper class for registering and postMessage to webWorker```jsconst worker = new WorkerMainThread(options);worker.postMessage(message);```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="workerthread">WorkerThread</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

helper class to define web worker thread;```jsnew WorkerThread({	onMessage: ({ event, postMessage }) => {		const message = undefined;		// code to handle the message		postMessage(message);	},});```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_">_</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- scoping helper for `signal` based reactifity stored in static Method of class `_`;- if you use our `Component` class, use this class static method, instead of their respective class, for `autoscoping`,> which then you can use it's `attr` returned value to mark the element```js// on Component scopeonConnected(async()=>{	const data = _.let('test');	html`<div ${data.attr}="innerText"></div>`})```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
