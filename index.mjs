// @ts-check

/**
 * @param {((...args)=>Promise<any>)[]} asyncArrayFunctions
 * @param {any[]} args
 */
const handlePromiseAll = async (asyncArrayFunctions, ...args) => {
	await Promise.all(
		asyncArrayFunctions.map(async (callback) => {
			try {
				return await callback(...args);
			} catch (error) {
				console.error('Error in callback:', error);
				throw error;
			}
		})
	).catch((error) => {
		console.error('Promise.all failed:', error);
	});
};

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
	P = 'hf_ss-binded_viewport';
	/**
	 * @readonly
	 */
	PX = 'hf_ss-binded_viewport_on_exit';
	/**
	 * @readonly
	 */
	V = 'hf_ss-binded_value';
	/**
	 * @readonly
	 */
	LC = 'hf_ss-binded_lifecycle';
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
								for (let i = 0; i < mutation.removedNodes.length; i++) {
									if (mutation.removedNodes[i] === element) {
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
	 * remove all effects
	 * @return {void}
	 */
	removeAll$ = () => {
		this.S = [];
	};
	/**
	 * remove effect
	 * @param {$} $
	 * @return {void}
	 */
	remove$ = ($) => {
		this.S = this.S.filter((S) => $.E !== S);
	};
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
				await handlePromiseAll(this.S, false);
			}, helper.D)
		);
	}
}

export class $ {
	E;
	/**
	 * @private
	 */
	first = true;
	/**
	 * @param {(isAtInitialization:boolean)=>Promise<void>} asyncCallback
	 */
	constructor(asyncCallback) {
		this.E = asyncCallback;
		helper.QH.A(
			new _QueueObjectFIFO(async () => {
				helper.S = asyncCallback;
				await asyncCallback(this.first);
				this.first = false;
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
	 * @param {documentScope} [documentScope]
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

export class Ping {
	/**
	 * async callback when pinged
	 * @private
	 * @type {(isAtInitisalization:boolean)=>Promise<void>}
	 */
	AC;
	/**
	 * @param {(isAtInitisalization:boolean)=>Promise<void>} asyncCallbackWhenPinged
	 */
	constructor(asyncCallbackWhenPinged) {
		this.AC = asyncCallbackWhenPinged;
		this.ping(true);
	}
	/**
	 * @param {boolean} first
	 */
	ping = (first = false) => {
		helper.QH.A(
			new _QueueObjectFIFO(async () => {
				await this.AC(first);
			}, helper.D)
		);
	};
}

class MainMutaitonObserver {
	/**
	 * @type {MainMutaitonObserver}
	 */
	static __;
	constructor() {
		if (MainMutaitonObserver.__ instanceof MainMutaitonObserver) {
			return;
		}
		MainMutaitonObserver.__ = this;
		this.documentMutation_ = new Let('');
		this.documentObserver = new MutationObserver((mutationList) => {
			mutationList.forEach((mutation) => {
				// @ts-ignore
				this.documentMutation_.value = mutation;
			});
		});
		this.documentObserver.observe(document, {
			childList: true,
			subtree: true,
		});
	}
}

export class Lifecycle {
	/**
	 * registered effect
	 * @private
	 * @type {$}
	 */
	$;
	/**
	 * attributes lifecycle callbacks
	 * @private
	 * @type {{
	 * [attributeName:string]:
	 * (element:HTMLElement|Element, unObserve:()=>void)=>(Promise<()=>Promise<void>>)
	 * }}
	 */
	AL;
	/**
	 * document scope
	 * @private
	 * @type {documentScope}
	 */
	DS;
	/**
	 * @private
	 * @type {MutationObserver}
	 */
	O;
	/**
	 * @private
	 * @type {Let<MutationRecord[]>}
	 */
	ML;
	/**
	 * @param {{
	 * [attributeName:string]:
	 * (element:HTMLElement|Element, unObserve:()=>void)=>(Promise<()=>Promise<void>>)
	 * }} attrLifecycleCallback
	 * @param {documentScope} [documentScope]
	 */
	constructor(attrLifecycleCallback, documentScope = document) {
		this.AL = attrLifecycleCallback;
		this.DS = documentScope;
		if (documentScope === document) {
			if (!(MainMutaitonObserver.__ instanceof MainMutaitonObserver)) {
				new MainMutaitonObserver();
			}
			// @ts-ignore
			this.O = MainMutaitonObserver.__.documentObserver;
			// @ts-ignore
			this.ML = MainMutaitonObserver.__.documentMutation_;
		} else {
			// @ts-ignore
			this.ML = new Let('');
			this.O = new MutationObserver((mutationList) => {
				this.ML.value = mutationList;
			});
			this.O.observe(documentScope, {
				childList: true,
				subtree: true,
			});
		}
		this.$ = new $(async () => {
			this.ML.value;
			await this.CE();
		});
	}
	/**
	 * disconnected callbacks
	 * @private
	 * @type {{
	 * [attributeName:string]: ()=>Promise<void>
	 * }}
	 */
	DC = {};
	/**
	 * @private
	 */
	CE = async () => {
		for (const attributeName in this.AL) {
			const lifecycle = this.AL[attributeName];
			const elements = this.DS.querySelectorAll(`[${attributeName}]`);
			const batch = [];
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				if (!element.hasAttribute(helper.LC)) {
					element.setAttribute(helper.LC, '');
					const attributeIdentifier = `${attributeName}="${
						element.getAttribute(attributeName) ?? ''
					}"`;
					if (!this.DC[attributeIdentifier]) {
						this.DC[attributeIdentifier] = await lifecycle(element, this.unObserve);
					}
				}
			}
		}
		for (const attributeSelector in this.DC) {
			const disconnectedCallback = this.DC[attributeSelector];
			if (!this.DS.querySelector(`[${attributeSelector}]`)) {
				await disconnectedCallback();
				delete this.DC[attributeSelector];
				if (Object.keys(this.DC).length === 0) {
					this.ML.remove$(this.$);
				}
			}
		}
	};
	unObserve = () => {
		helper.QH.A(
			new _QueueObjectFIFO(async () => {
				if (this.DC) {
					let DCS = [];
					for (const attributeIdentifier in this.DC) {
						DCS.push(this.DC[attributeIdentifier]);
					}
					await handlePromiseAll(DCS);
					this.DC = {};
				}
				this.ML.remove$(this.$);
				if (this.DS === document) {
					return;
				}
				this.O.disconnect();
			}, helper.D)
		);
	};
}
