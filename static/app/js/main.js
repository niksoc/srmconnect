import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout from './Layout.js';
import Home from './pages/Home';
import ExperienceSpeaks from './pages/ExperienceSpeaks';
import Wanted from './pages/Wanted';
import Available from './pages/Available';


const app = document.getElementById('app');

ReactDOM.render(
	<Router history={browserHistory}>
	<Route path='/' component={Layout}>
	<IndexRoute component={Home}></IndexRoute>
	<Route path='experience_speaks' component={ExperienceSpeaks} />
	<Route path='wanted' component={Wanted} />
	<Route path='available' component={Available} />
	<Route path='*' component={Home} />
	</Route>
	</Router>
	, app);
