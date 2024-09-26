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

- [WorkerMainThread](#workermainthread)

- [WorkerThread](#workerthread)

- [_](#_)

<h2 id="$">$</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

generate side effect for `signal` based reactivity such as for:- [Let](#let)```jsconst letExample = new Let('')new $(async(first)=>{ const value = test.value; if(first){     return;     // return early if you want to opt out from handling the effect immediately,     // also by doing this you can make the `$` slightly more performance 1) when dealing with `async await` on hydration,     // such as data fetching; }     // handle value})// 1) and when all of the effects is registered, you can call `letExample.call$` to call for effect in parallel;```- [Derived](#derived)```js// bassically the same with `Let` but use `new Derived````

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="animation">Animation</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

collections of static methods helper for animation;static method prefixed with `animation` can be used to generate recuring frame,which in turn can be used in the callback to animate stuffs

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="app">App</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`App` starter helper for module environtment;the sole purpose is just to auto import the necessary file in your main js file;

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

-`signal` based reactivity, wich value are derived from reacting to [`Let<T>.value`](#let) effects that are called in the `asyncCallback` this class instantiation;```js// @ts-checkconst letSingle = new Let(1);const doubleExample = new Derived(async()=>{	const value = letSingle.value; // autoscubscribed to `letSingle` value changes;return value * 2; // returned value are to be derivedValue});```- `dataOnly`:```jsconst dataOnlyExample = Derived.dataOnly(asyncCallback);```> - this will automatically opt you out from `domReflector`;- make sure to check `argument` documentation in your `IDE` `typehint`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="documentscope">documentScope</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `documentScope`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="event_">Event_</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`eventListener` helper to create `autoqueued` callback;```js// @ts-checksomeObject.addEventListener('click', Event_.listener( (event) => {// code}))```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="for">For</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- assign element to loop through ['List'](#list) as data to render child element using class instantiation;- naming html attribute:> - forAttributeName use `for-` as prefix in html;> - keys form `List` can reflect to DOM by prefixing with `c-${forAttributeNameNoForPrefix}-`- loped childElement:> - must have `HTMLElement` as first children;> - only first children will be used to loop through `List`, all other children will be deleted from the dom on `onConnected` event of parentElement;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="let">Let</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

`signal` based reactivity;assigning newValue to Let insance:```jsconst letSingle = new Let(1, ...args);letSingle.value++; // 2;letSingle.value = 3 // 3;````dataOnly`:```jsconst dataOnlyExample = Let.dataOnly(args0);```- this will automatically opt you out from `domReflector`make sure to check `argument` documentation in your `IDE` `typehint`;- `methods`:> - `call$`: manually triggers `effects` subscribed to `thisInstance`;> - `remove$`: unubscribe `thisInstance` from specific `effect`;> - `removeAll$`: unubscribe `thisInstance` from all of its `effects`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="lifecycle">Lifecycle</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

helper class to track connected and disconnected of an element, with attribute selector;```jsnew Lifecycle({[attributeName]: async(options)=>{			// command;		}	},	// [documentScope])```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="lifecyclehandler">lifecycleHandler</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

type helper for `lifecycleHandler` & `attributeChangedLifecycle`

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="list">List</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper class to create list that satisfy`Array<Record<string, Let<string>>>````jsconst listExample = new List([     {key1: new Let("test"), ...keys},     {key1: _.let("test2"), ...keys},     {key1: _.let_("test3"), ...keys},])```- usefull for `loops`;

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

- syntax sugar for `signal` based reactifity stored in static Method of class `_`,> - `_.let`: for [new Let](#let);> - `_.let_`: for [Let.dataOnly](#let);> - `_.derived`: for [new Derived](#derived);> - `_.derived_`: for [Derived.dataOnly](#derived);> - `_.$`: for [new $](#$);> - `_.list`: for [new List](#list);- it also shortened by at least 2characters, and since most of our APIs are a class,  `treeshaking` will not uglify the method/property of the class, having it shortedned like this is a plus,  especially if you don't plan on gzipping the file;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
