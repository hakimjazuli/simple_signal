# how to setup

we have several way of installing this library to your app, depending on how you want to use it

## you have no need of typehinting

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

## you are comfortable with typehinting and you wanted to make it modular

-   install using `npm i "@html_first/simple_signal`

```js
// @ts-check

import { Let, $, Derived } from '@html_first/simple_signal';
```

## you are comfortable with typehinting but you don't want to be bothered to install using npm

copy this code and slap before your own code

```js
// @ts-check

class Functions {
	/**
	 * timeout
	 * @public
	 * @param {number} ms
	 */
	static T = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	/**
	 * is_async
	 * @public
	 * @param {CallableFunction} callback
	 */
	static IA = (callback) => callback.constructor.name === 'AsyncFunction';
}

class _QueueObjectFIFO {
	/**
	 * details
	 * @type {[callback:()=>(any|Promise<any>),debounce:(number|false)]}
	 */
	D;
	/**
	 * @param {()=>(any|Promise<any>)} callback
	 * @param {number|false} [debounce]
	 * - in ms
	 */
	constructor(callback, debounce = false) {
		this.D = [callback, debounce];
	}
}

class _QueueFIFO {
	/**
	 * queue
	 * @private
	 * @type {_QueueObjectFIFO['D'][]}
	 */
	Q = [];
	/**
	 * is_running
	 * @private
	 * @type {boolean}
	 */
	IR = false;
	/**
	 * assign
	 * @public
	 * @param {_QueueObjectFIFO} _queue
	 */
	A = (_queue) => {
		this.P(_queue);
		if (!this.IR) {
			this.R();
		}
	};
	/**
	 * push
	 * @private
	 * @param {_QueueObjectFIFO} _queue
	 */
	P = (_queue) => {
		this.Q.push(_queue.D);
	};
	/**
	 * run
	 * @private
	 */
	R = async () => {
		this.IR = true;
		while (this.Q.length !== 0) {
			for (let i = 0; i < this.Q.length; i++) {
				const [callback, debounce_ms] = this.Q[i];
				this.Q.shift();
				if (debounce_ms) {
					await Functions.T(debounce_ms);
				}
				if (Functions.IA(callback)) {
					await callback();
					break;
				}
				callback();
				break;
			}
		}
		this.IR = false;
	};
}
const helper = new (class {
	/**
	 * @type {null|(()=>Promise<void>)}
	 */
	S = null;
	QH;
	D;
	/**
	 * Description
	 * @param {number|false} debounce
	 */
	constructor(debounce = false) {
		this.D = debounce;
		this.QH = new _QueueFIFO();
	}
})();

/**
 * @template V
 */
class Let {
	/**
	 * subscription
	 * @private
	 * @type {(()=>Promise<void>)[]}
	 */
	S = [];
	/**
	 * value placeholder
	 * @private
	 * @type {V}
	 */
	V_;
	/**
	 * @param {V} value
	 */
	constructor(value) {
		this.V_ = value;
	}
	/**
	 * @returns {V}
	 */
	get value() {
		if (helper.S) {
			this.S.push(helper.S);
		}
		return this.V_;
	}
	/**
	 * @param {V} newValue
	 */
	set value(newValue) {
		this.V_ = newValue;
		if (!this.S) {
			return;
		}
		helper.QH.A(
			new _QueueObjectFIFO(async () => {
				await Promise.all(
					this.S.map(async (callback) => {
						try {
							return await callback();
						} catch (error) {
							console.error('Error in callback:', error);
							throw error;
						}
					})
				).catch((error) => {
					console.error('Promise.all failed:', error);
				});
			}, helper.D)
		);
	}
}

class $ {
	/**
	 * @param {()=>Promise<void>} asyncCallback
	 */
	constructor(asyncCallback) {
		helper.S = asyncCallback;
		asyncCallback();
		helper.S = null;
	}
}

/**
 * @template V
 */
class Derived extends Let {
	/**
	 * @param {()=>Promise<V>} asyncCallback
	 */
	constructor(asyncCallback) {
		super('');
		new $(async () => {
			this.value = await asyncCallback();
		});
	}
}
```

## classes api

-   `Let`:
    > -   params `(value:VType)`;
    > -   returns:
    >     > -   `get value(): VType`
    >     > -   `set value(newValue:VType): void`
-   `$`:
    > -   params `(async_function:()=>Promise<void>)`;
-   `Derived`:

    > -   params `(async_function:()=>Promise<VType>)`;
    > -   returns:
    >     > -   `get value(): VType`
    >     > -   `set value(newValue:VType): void`
