import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '@modules/App';

const rootEl = document.getElementById('root');

render(
	<AppContainer>
		<App />
	</AppContainer>,
	rootEl
);

if (module.hot) {
	module.hot.accept('./modules/App', () => {
		const NewApp = require('./modules/App').default;

		render(
			<AppContainer>
				<NewApp />
			</AppContainer>,
			rootEl
		);
	});
}
