## about @html_first/simple_signal

all of our classes designed to works in asynchronous context using Queues, so you can use it for api
calls reactively without too much of mental overheads; we use attributeName to target elements on
the DOM so it can be used as declaratively as possible despite minified;non-gzipped version of this
library is less then 5kB;

## classes api

-   `Let`:
    > -   params
    >     `(value:VType, attributeName?:string, documentScope?: HTMLElement|Element|ShadowRoot|Document)`;
    >     > -   `attributeName`: allow to reflect the value to dom, by targeting the value of
    >     >     `...(attributeName|propertyName);`;
    >     > -   `documentScope`: scope of the real dom reflector, can be really usefull for
    >     >     webcomponent;
    > -   returns:
    >     > -   `get value(): VType`
    >     > -   `set value(newValue:VType): void`
    > -   example1:
    >     > -   `const a = new Let('a');`
    > -   example2:
    >     > -   `const a = new Let('example', 'param-a');`
    >     > -   `<div param-a="innerText;data-a"></div>` will reflect to DOM
    >     >     `<div param-a="innerText;data-a" data-a="example">example</div>`
    > -   note:
    >     > -   adding `value` to the html attribute like = `attributeName="...;value;..."`, will
    >     >     bind the js variable value to the element value, only works on element that have
    >     >     valid `oninput` attribute
-   `Derived`:
    > -   params
    >     `(async_function:()=>Promise<VType>, attributeName?:string, documentScope?: HTMLElement|Element|ShadowRoot|Document)`;
    >     > -   `attributeName`: allow to reflect the value to dom, by targeting the value of
    >     >     `...(attributeName|propertyName);`;
    >     > -   `documentScope`: scope of the real dom reflector, can be really usefull for
    >     >     webcomponent;
    > -   returns:
    >     > -   `get value(): VType`
    > -   example1:
    >     > -   "const b = new Derived(async()=>\`derived from ${a.value}\`);"
    > -   example2:
    >     > -   "const b = new Derived(async()=>\`derived from ${a.value}\`, 'param-a');"
    >     > -   `<div param-a="innerText;data-a"></div>` will reflect to DOM
    >     >     `<div param-a="innerText;data-a" data-a="value of a">value of a</div>`
-   `$`:
    > -   params `(async_function:()=>Promise<void>)`;
    > -   example:
    >     > -   `new $( async () => { document.querySelector('p')?.setAttribute('text', b.value) });`
-   `Lifecycle`:
    > -   usefull for adding event listeners;
    > -   params:
    >     `(attributeName:string, lifecycleCallback:(element:HTMLElement)=>(Promise<()=>(Promise<void>)>), documentScope?:HTMLElement|Element|ShadowRoot|Document)`;
    > -   example:
    >     > -   `const clickEvent=()=>{ console.log("i've been clicked") }`
    >     > -   `new Lifecycle('elem-event', async (element) => { element.addEventListener('click', clickEvent); return async () => { element.removeEventListener('click', clickEvent); }; });`
    >     > -   `<buttton elem-event>click me</button>`
    >     > -   which will fire anytime new element with `elem-event` is created on the
    >     >     documentScope and the returned async function will be fired when element is removed
    >     >     from the documentScope

## how to setup

we have several way of installing this library to your app, depending on how you want to use it

## IF you have no need of typehinting

we have very little api to remember so you can just slap our prebundled on head tag and use it as is

-   download the `prebundled.mjs`;
-   add the script on html `head`;

```html
<head>
	...
	<script src="./path/to/prebundled.mjs" type="module" defer></script>
	...
</head>
```

-   we put it in a `.mjs` and `type="module"` so the `variables` doesn't bleed out without add
    additional closures, or function calls in the libs

## IF you are comfortable with typehinting and you wanted to make it modular

-   install using `npm i @html_first/simple_signal`

```js
// @ts-check

import { Let, $, Derived, Lifecycle } from '@html_first/simple_signal';
```

## IF you are comfortable with typehinting but you don't want to be bothered to install using npm

copy the [index.mjs](https://github.com/hakimjazuli/simple_signal/blob/main/index.mjs) on
[our github](https://github.com/hakimjazuli/simple_signal/) code and slap before your own js code

-   delete the `export` statement on all classes;
