# how to setup

we have several way of installing this library to your app, depending on how you want to use it

## classes api

-   `Let`:
    > -   params
    >     `(value:VType, attributeName?:string, documentScope?: document|HTMLELement|ShadowRoot)`;
    >     > -   `attributeName`: allow to reflect the value to dom, by targeting the value of
    >     >     `...(attributeName|propertyValue);`;
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
    >     `(async_function:()=>Promise<VType>, attributeName?:string, documentScope?: document|HTMLELement|ShadowRoot)`;
    >     > -   `attributeName`: allow to reflect the value to dom, by targeting the value of
    >     >     `...(attributeName|propertyValue);`;
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

## IF you are comfortable with typehinting and you wanted to make it modular

-   install using `npm i @html_first/simple_signal`

```js
// @ts-check

import { Let, $, Derived } from '@html_first/simple_signal';
```

## IF you are comfortable with typehinting but you don't want to be bothered to install using npm

copy the index.mjs on github code and slap before your own js code

-   delete the `export` statement on all three class;
