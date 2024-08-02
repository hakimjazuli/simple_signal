// @ts-check

/**
 * @param {string} string
 * @returns {string}
 */
const validateHtmlTagAttrName = (string) => {
	return string
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-+/g, '-');
};

/**
 * @template {{
 * [x: string]: ''
 * }} attrHelpers
 * @param {attrHelpers} attrHelpers
 * @returns {Record.<keyof NonNullable<attrHelpers>, string>}
 */
export const attrHelper = (attrHelpers) => {
	/**
	 * @type {Record.<keyof NonNullable<attrHelpers>, string>}
	 */
	// @ts-ignore
	const attrs_ = {};
	for (const attr in attrHelpers) {
		attrs_[attr] = validateHtmlTagAttrName(attr.toString());
	}
	return attrs_;
};

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

/**
 * uses generic class instance instead of const, to track whether there are
 * unnamed property being accessed
 */
const helper = new (class {
	/**
	 * subscriber
	 * @type {null|((isAtInitialization:boolean)=>Promise<void>)}
	 */
	S = null;
	QH = new _QueueFIFO();
	/**
	 * debounce
	 * @type {number|false}
	 */
	D = false;
	/**
	 * attribute helper for binded
	 */
	/**
	 * @readonly
	 */
	P = 'hf_ss:binded_viewport';
	/**
	 * @readonly
	 */
	PX = 'hf_ss:binded_viewport_on_exit';
	/**
	 * @readonly
	 */
	V = 'hf_ss:binded_value';
	/**
	 * @readonly
	 */
	C = 'hf_ss:binded_lifecycle';
})();

export class OnViewPort {
	/**
	 * @param {string} attributeName
	 * @param {(element:IntersectionObserverEntry['target'])=>Promise<void>} OnViewCallback
	 * @param {(element:IntersectionObserverEntry['target'], unObserve:()=>void)=>Promise<void>} [onExitingViewport]
	 * undefined: will automatically fires unObserve callback;
	 * @param {documentScope} [documentScope]
	 */
	constructor(
		attributeName,
		OnViewCallback,
		onExitingViewport = async (e, u) => {
			u();
		},
		documentScope = document
	) {
		const elements = documentScope.querySelectorAll(`[${attributeName}]`);
		if (!elements) {
			return;
		}
		const observer = new IntersectionObserver(
			(elements, observer) => {
				helper.QH.A(
					new _QueueObjectFIFO(async () => {
						for (let i = 0; i < elements.length; i++) {
							const element = elements[i].target;
							if (elements[i].isIntersecting) {
								element.setAttribute(helper.PX, '');
								await OnViewCallback(element);
							} else if (element.hasAttribute(helper.PX)) {
								await onExitingViewport(element, () => observer.disconnect());
							}
						}
					}, helper.D)
				);
			},
			{ threshold: [0, 0] }
		);
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			if (element.hasAttribute(helper.P)) {
				return;
			}
			element.setAttribute(helper.P, '');
			observer.observe(element);
		}
	}
}

/**
 * @typedef {HTMLElement|Element|ShadowRoot|Document} documentScope
 */

/**
 * @type {(()=>void)[]}
 */
const documentObserverFunctions = [];

/**
 * @param {() => void} fn
 */
const addToDocumentObserverFunctions = (fn) => {
	const exists = documentObserverFunctions.some((existingFn) => existingFn === fn);
	if (!exists) {
		documentObserverFunctions.push(fn);
	}
};

const mainDocumentObserver = new MutationObserver((mutationsList, observer) => {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			for (let i = 0; i < documentObserverFunctions.length; i++) {
				documentObserverFunctions[i]();
			}
		}
	}
});
mainDocumentObserver.observe(document, {
	childList: true,
	subtree: true,
});

export class Lifecycle {
	/**
	 * @private
	 */
	AL;
	/**
	 * @private
	 */
	DS;
	/**
	 * @private
	 */
	O;
	unObserve = () => {
		if (!this.O) {
			console.warn('you are not allowed to un-observe from main document observer');
			return;
		}
		this.O.disconnect();
	};
	/**
	 * @param {{
	 * [attributeName:string]:(element:HTMLElement|Element)=>(Promise<()=>(Promise<void>)>)
	 * }} attrLifecycleCallbacks
	 * @param {documentScope} [documentScope]
	 */
	constructor(attrLifecycleCallbacks, documentScope = document) {
		this.AL = attrLifecycleCallbacks;
		this.DS = documentScope;
		if (documentScope == document) {
			addToDocumentObserverFunctions(this.CE);
		} else {
			this.O = new MutationObserver((mutationsList, observer) => {
				for (let mutation of mutationsList) {
					if (mutation.type === 'childList') {
						this.CE();
					}
				}
			});
			this.O.observe(documentScope, {
				childList: true,
				subtree: true,
			});
		}
		/**
		 * initial check;
		 * without this, individual observer will not be called when no mutation is there;
		 */
		this.CE();
	}
	/**
	 * @private
	 */
	CE = () => {
		for (let attributeName in this.AL) {
			const lifecycleCallback = this.AL[attributeName];
			const elements = Array.from(this.DS.querySelectorAll(`[${attributeName}]`));
			if (
				!(this.DS instanceof ShadowRoot) &&
				!(this.DS instanceof Document) &&
				this.DS.hasAttribute(attributeName)
			) {
				elements.push(this.DS);
			}
			if (!elements) {
				return;
			}
			for (let j = 0; j < elements.length; j++) {
				const element = elements[j];
				if (element.hasAttribute(helper.C)) {
					continue;
				}
				element.setAttribute(helper.C, '');
				helper.QH.A(
					new _QueueObjectFIFO(async () => {
						if (!element.parentNode) {
							return;
						}
						const dismountCallback = await lifecycleCallback(element);
						new MutationObserver((mutationsList, observer) => {
							if (!this.DS.contains(element)) {
								helper.QH.A(
									new _QueueObjectFIFO(async () => {
										await dismountCallback();
										observer.disconnect();
									}, helper.D)
								);
								return;
							}
						}).observe(this.DS, { childList: true, subtree: true });
					}, helper.D)
				);
			}
		}
	};
}

/**
 * @param {any} val
 * @param {string} attributeName
 * @param {documentScope} documentScope
 * @param {Let} letObject
 * @returns {void}
 */
const setDomReflector = (val, attributeName, documentScope, letObject) => {
	const elements = Array.from(documentScope.querySelectorAll(`[${attributeName}]`));
	if (
		!(documentScope instanceof ShadowRoot) &&
		!(documentScope instanceof Document) &&
		documentScope.hasAttribute(attributeName)
	) {
		elements.push(documentScope);
	}
	if (!elements) {
		return;
	}
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const targets = (element.getAttribute(attributeName) ?? '').split(';');
		for (let i = 0; i < targets.length; i++) {
			const target = targets[i];
			try {
				if (!(target in element)) {
					throw '';
				}
				element[target] = val;
				if (
					target === 'value' &&
					'value' in element &&
					element.parentNode &&
					!element.hasAttribute(helper.V)
				) {
					element.setAttribute(helper.V, '');
					const updater = () => {
						letObject.value = element.value;
					};
					element.addEventListener('input', updater);
					new MutationObserver((mutationsList, observer) => {
						for (let mutation of mutationsList) {
							if (mutation.type === 'childList') {
								for (let removedNode of mutation.removedNodes) {
									if (removedNode === element) {
										element.removeEventListener('input', updater);
										observer.disconnect();
										return;
									}
								}
							}
						}
					}).observe(element.parentNode, { childList: true });
				}
			} catch (error) {
				val = JSON.stringify(val).replace(/^"(.*)"$/, '$1');
				if (target == '') {
					console.warn({
						element,
						attributeName,
						message: "doesn't have target",
					});
					return;
				}
				element.setAttribute(target, val);
			}
		}
	}
};

/**
 * @template V
 */
export class Let {
	/**
	 * subscription
	 * @private
	 * @type {((isAtInitialization:boolean)=>Promise<void>)[]}
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
	 * @param {documentScope} [documentScope]
	 */
	constructor(value, attributeName = undefined, documentScope = undefined) {
		this.V_ = value;
		if (attributeName) {
			new $(async () => {
				setDomReflector(this.value, attributeName, documentScope ?? document, this);
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
							return await callback(false);
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
	 * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
	 */
	constructor(asyncCallback) {
		helper.QH.A(
			new _QueueObjectFIFO(async () => {
				helper.S = asyncCallback;
				await asyncCallback(true);
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
	constructor(asyncCallback, attributeName = undefined, documentScope = undefined) {
		super('', attributeName, documentScope);
		new $(async () => {
			super.value = await asyncCallback();
		});
	}
	get value() {
		return super.value;
	}
	set value(v) {
		console.warn('you are not allowed to change Derived value manually');
	}
}

export class Ping extends Let {
	/**
	 * @param {()=>Promise<void>} asyncCallbackWhenPinged
	 * @param {boolean} [runCallbackAtInitialization]
	 */
	constructor(asyncCallbackWhenPinged, runCallbackAtInitialization = false) {
		super(runCallbackAtInitialization);
		new $(async () => {
			switch (super.value) {
				case true:
				case false:
				default:
					if (!runCallbackAtInitialization) {
						runCallbackAtInitialization = true;
						return;
					}
					break;
			}
			await asyncCallbackWhenPinged();
		});
	}
	get value() {
		console.warn('you are not allowed to lookup Ping value manually');
		return super.value;
	}
	set value(v) {
		console.warn('you are not allowed to change Ping value manually');
	}
	/**
	 * notify all effects registered to this instance
	 */
	ping = () => {
		super.value = !super.value;
	};
}
