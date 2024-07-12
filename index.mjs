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

const helper = {
	/**
	 * subscriber
	 * @type {null|(()=>Promise<void>)}
	 */
	S: null,
	QH: new _QueueFIFO(),
	/**
	 * debounce
	 * @type {number|false}
	 */
	D: false,
	/**
	 * attribute helper for binded inputs
	 */
	B: 'binded:with:let',
};

/**
 * @param {any} val
 * @param {string} attributeName
 * @param {Document|HTMLElement|ShadowRoot} documentScope
 * @param {Let} letObject
 * @returns {void}
 */
const setDomReflector = (val, attributeName, documentScope, letObject) => {
	const elements = documentScope.querySelectorAll(`[${attributeName}]`);
	if (!elements) {
		return;
	}
	elements.forEach((element) => {
		val = JSON.stringify(val).replace(/^"(.*)"$/, '$1');
		const targets = (element.getAttribute(attributeName) ?? '').split(';');
		for (let i = 0; i < targets.length; i++) {
			const target = targets[i];
			try {
				if (!(target in element)) {
					throw '';
				}
				element[target] = val;
				if (target === 'value' && 'value' in element && !element.hasAttribute(helper.B)) {
					element.setAttribute(helper.B, '');
					element.addEventListener('input', () => {
						letObject.value = element.value;
					});
				}
			} catch (error) {
				element.setAttribute(target, val);
			}
		}
	});
};

/**
 * @template V
 */
export class Let {
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
	 * @param {string} [attributeName]
	 * @param {Document|HTMLElement|ShadowRoot} [documentScope]
	 */
	constructor(value, attributeName = undefined, documentScope = document) {
		this.V_ = value;
		if (attributeName) {
			new $(async () => {
				setDomReflector(this.value, attributeName, documentScope, this);
			});
		}
	}
	/**
	 * @returns {V}
	 */
	get value() {
		if (helper.S && !this.S.some((f) => f === helper.S)) {
			this.S.push(helper.S);
		}
		return this.V_;
	}
	/**
	 * @param {V} newValue
	 */
	set value(newValue) {
		if (this.V_ === newValue) {
			return;
		}
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

export class $ {
	/**
	 * @param {()=>Promise<void>} asyncCallback
	 */
	constructor(asyncCallback) {
		helper.QH.A(
			new _QueueObjectFIFO(async () => {
				helper.S = asyncCallback;
				await asyncCallback();
				helper.S = null;
			}, helper.D)
		);
	}
}

/**
 * @template V
 */
export class Derived extends Let {
	/**
	 * @param {()=>Promise<V>} asyncCallback
	 * @param {string} [attributeName]
	 * @param {Document|HTMLElement|ShadowRoot} [documentScope]
	 */
	constructor(asyncCallback, attributeName = undefined, documentScope = document) {
		super('', attributeName, documentScope);
		new $(async () => {
			super.value = await asyncCallback();
		});
	}
	get value() {
		return super.value;
	}
	/**
	 * @private
	 */
	set value(v) {
		console.log('you are not allowed to change derived value manually');
	}
}
