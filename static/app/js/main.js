import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout from './Layout';
import Latest from './pages/Latest';
import ExperienceSpeaks from './pages/ExperienceSpeaks';
import Wanted from './pages/Wanted';
import ListView from './components/ModelViews/ListView';
import DetailView from './components/ModelViews/DetailView';
import Available from './pages/Available';
import {BASE_URL} from './constants';

const app = document.getElementById('app');

const routes = (
	<Route path={BASE_URL} component={Layout}>
	<IndexRoute component={Latest}></IndexRoute>
	<Route path='experience_speaks' component={ExperienceSpeaks} />
	<Route title='Wanted' path='wanted' model='wanted' bsStyle='info' orderings={['-created','-num_views']} component={Wanted}>
	</Route>
	<Route title='Available' path='available' model='available' bsStyle='success' orderings={['-created','-num_views']} component={Wanted}>
	</Route>
	<Route path='*' component={Latest} />
	</Route>);

ReactDOM.render(
	<Router history={browserHistory}>
	{routes}
	</Router>
	, app);



