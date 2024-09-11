// @ts-check

/**
 * @param {((...args)=>Promise<any>)[]} asyncArrayFunctions
 * @param {any[]} args
 */
export const handlePromiseAll = async (asyncArrayFunctions, ...args) => {
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
