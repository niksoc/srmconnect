import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import Layout from './Layout';
import ListViewPage from './pages/ListViewPage';
import MultiListViewPage from './pages/MultiListViewPage';
import SimpleDetailViewPage from './pages/SimpleDetailViewPage';
import QuestionAnswerPage from './pages/QuestionAnswerPage';
import ProfilePage from './pages/ProfilePage';
import {BASE_URL} from './constants';
import FEATURES from './features';
import axios from 'axios';
const app = document.getElementById('app');

if(window._SRMXCHANGE_INIT_ROUTE_!=='None') browserHistory.push(BASE_URL+window._SRMXCHANGE_INIT_ROUTE_);

function redirectToLatest(nextState, replaceState){
    replaceState(BASE_URL);
}

const routes = (
	<Route path={BASE_URL} component={Layout}>
	<IndexRoute mainTitle='Latest' component={MultiListViewPage} features={FEATURES}/>
	<Route {...FEATURES[0]} path='profile/:id' component={ProfilePage} />
	<Route {...FEATURES[0]} path='question' component={ListViewPage} />
	<Route {...FEATURES[0]} path='question/:id' component={QuestionAnswerPage} />
	<Route {...FEATURES[1]} path='wanted'  component={ListViewPage} />
	<Route {...FEATURES[1]} path='wanted/:id' component={SimpleDetailViewPage} />
	<Route {...FEATURES[2]} path='available' component={ListViewPage} />
	<Route {...FEATURES[2]} path='available/:id' component={SimpleDetailViewPage} />
	<Route {...FEATURES[3]} path='story' component={ListViewPage} />
	<Route {...FEATURES[3]} path='story/:id' component={SimpleDetailViewPage} />
	<Route {...FEATURES[4]} path='project' component={ListViewPage} />
	<Route {...FEATURES[4]} path='project/:id' component={SimpleDetailViewPage} />
	<Route path='*' component={MultiListViewPage} onEnter={redirectToLatest}/>
	</Route>);

ReactDOM.render(
	<Router history={browserHistory}>
	{routes}
	</Router>
	, app);
