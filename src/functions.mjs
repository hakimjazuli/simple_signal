// @ts-check

export class functions {
	/**
	 * @param {number} ms
	 */
	static timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	/**
	 * is_async
	 * @param {CallableFunction} callback
	 */
	static isAsync = (callback) => callback.constructor.name === 'AsyncFunction';
	/**
	 * split with escape string `\`
	 * @param {string} string
	 * @param {string} delimiter
	 */
	static splitX = (string, delimiter) => {
		let result = [];
		let current = '';
		let isEscaped = false;
		for (let i = 0; i < string.length; i++) {
			let char = string[i];
			if (isEscaped) {
				current += char;
				isEscaped = false;
			} else if (char === '\\') {
				isEscaped = true;
			} else if (char === delimiter) {
				result.push(current);
				current = '';
			} else {
				current += char;
			}
		}
		result.push(current);
		return result;
	};
	/**
	 * @param {string} attributeName
	 * @returns {string}
	 */
	static validAttributeNameSelector = (attributeName) =>
		attributeName.toLowerCase().replaceAll(':', '\\:');
}
