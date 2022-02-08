/**
 * Loop templating
 * 
 * Usage:
 * - html: `<div id="users"><li>[name]</li></div>`
 * - js: `maplist(document.getElementById('users'), [{ name: 'Amigos' }])`
 * 
 * @param {HTMLElement} $el
 * @param {Array<{ [key: string]: unknown }>} data
 * @param {RegExp?} customRegExp
 */
function maplist($el, data, customRegExp) {
	const interpolationRegex = customRegExp || /\[([\w]+)\]/g;
	const num = (item, i) => ({i, n: i+1, ...item})
	
	$el._$ = $el._$ || $el.innerHTML;
	$el.textContent = '';
	
	$el.innerHTML = data.map(num).reduce((rawTemplate, obj) => {
		return rawTemplate += $el._$.replace(
			interpolationRegex,
			(match, group1) => obj[group1.trim()] ?? match
		)
	}, '')
}