# how to setup

we have several way of installing this library to your app, depending on how you want to use it

## classes api

-   `Let`:
    > -   params `(value:VType)`;
    > -   returns:
    >     > -   `get value(): VType`
    >     > -   `set value(newValue:VType): void`
    > -   example:
    >     > -   `const a = new Let('a');`
-   `Derived`:
    > -   params `(async_function:()=>Promise<VType>)`;
    > -   returns:
    >     > -   `get value(): VType`
    >     > -   `set value(newValue:VType): void`
    > -   example:
    >     > -   `const b = new Derived(async()=>`derived from ${a.value}`);`
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

-   install using `npm i "@html_first/simple_signal`

```js
// @ts-check

import { Let, $, Derived } from '@html_first/simple_signal';
```

## IF you are comfortable with typehinting but you don't want to be bothered to install using npm

copy the index.mjs on github code and slap before your own js code

-   delete the `export` statement on all three class;
