import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout from './Layout';
import Latest from './pages/Latest';
import ExperienceSpeaks from './pages/ExperienceSpeaks';
import ListViewPage from './pages/ListViewPage';
import SimpleDetailViewPage from './pages/SimpleDetailViewPage';
import ListView from './components/ModelViews/ListView';
import DetailView from './components/ModelViews/DetailView';
import Available from './pages/Available';
import GenericPanelItem from './components/GenericPanelItem';
import {BASE_URL} from './constants';
import axios from 'axios';

const app = document.getElementById('app');

if(window._SRMXCHANGE_INIT_ROUTE_!=='None') browserHistory.push(BASE_URL+window._SRMXCHANGE_INIT_ROUTE_);

const routes = (
	<Route path={BASE_URL} component={Layout}>
	<IndexRoute component={Latest}></IndexRoute>
	<Route path='experience_speaks' component={ExperienceSpeaks} />
	<Route title='Wanted' class={GenericPanelItem} path='wanted' model='wanted' bsStyle='info' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route title='Wanted' class={GenericPanelItem} path='wanted/:id' model='wanted' bsStyle='info' component={SimpleDetailViewPage} />
	<Route title='Available' class={GenericPanelItem} path='available' model='available' bsStyle='success' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route path='*' component={Latest} />
	</Route>);

ReactDOM.render(
	<Router history={browserHistory}>
	{routes}
	</Router>
	, app);










