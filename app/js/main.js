import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import Layout from './Layout';
import ListViewPage from './pages/ListViewPage';
import MultiListViewPage from './pages/MultiListViewPage';
import InfoPage from './pages/InfoPage';
import SimpleDetailViewPage from './pages/SimpleDetailViewPage';
import QuestionAnswerPage from './pages/QuestionAnswerPage';
import ProfilePage from './pages/ProfilePage';
import UserThumb from './components/UserThumb';
import ProfileSearchForm from './components/ProfileSearchForm';
import {BASE_URL} from './constants';
import FEATURES from './features';
import axios from 'axios';
const app = document.getElementById('app');

if(window._SRMXCHANGE_INIT_ROUTE_!=='None') browserHistory.push(BASE_URL+window._SRMXCHANGE_INIT_ROUTE_);

function redirectToLatest(nextState, replaceState){
    replaceState(BASE_URL);
}

const PROFILE = {
    title:'Users',
    model:'user_profile',
    class:UserThumb,
    orderings:['-num_views'],
    searchForm:ProfileSearchForm,
    itemsPerRow:2
};
const routes = (
	<Route path={BASE_URL} component={Layout}>
	<IndexRoute mainTitle='Latest' component={MultiListViewPage} features={FEATURES}/>
	<Route path='about' title='About' component={InfoPage} />
	<Route path='join_us' title='Join Us' component={InfoPage} />
	<Route {...PROFILE} path='profile'  component={ListViewPage} />
	<Route  path='profile/:id' component={ProfilePage} />
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
