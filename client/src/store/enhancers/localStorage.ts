import * as persistState from 'redux-localstorage';

export default persistState(undefined, {
	key: 'three_facts',
	paths: ['player']
});
