import * as React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';

import CreateGame from '@modules/CreateGame';
import InGame from '@modules/InGame';
import Lobby from '@modules/Lobby';

import { createStore } from '@store';

import Header from './Header';
import AuthDialog from './AuthDialog';

export const store = createStore();

export interface AppProps {}

class App extends React.Component<AppProps, undefined> {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Header />
						<AuthDialog open />
						<Switch>
							<Route path="/" exact component={Lobby} />
							<Route path="/createGame" component={CreateGame} />
							<Route path="/game/:id" component={InGame} />
							<Redirect to="/" />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
