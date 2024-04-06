/**
 *
 * @param {object[]} elements
 * @returns {string[]} elementIds
 */
export function getElementIdentifiersRecursively(elements){
	if(!elements) return [];
	const ids=[];
	for(let el of elements){
		ids.push(el.identifier);
		if(Array.isArray(el.elements)){
			for(let innerEl of getElementIdentifiersRecursively(el.elements)){
				ids.push(innerEl)
			}
		}
	}
	return ids;
}
