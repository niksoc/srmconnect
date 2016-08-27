import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import Layout from './Layout';
import ListViewPage from './pages/ListViewPage';
import MultiListViewPage from './pages/MultiListViewPage';
import SimpleDetailViewPage from './pages/SimpleDetailViewPage';
import ListView from './components/ModelViews/ListView';
import DetailView from './components/ModelViews/DetailView';
import Available from './pages/Available';
import GenericPanelItem from './components/GenericPanelItem';
import GenericThumbnailItem from './components/GenericThumbnailItem';
import StoryRow from './components/StoryRow';
import {BASE_URL} from './constants';
import axios from 'axios';
import QuestionRow from './components/QuestionRow';
const app = document.getElementById('app');

if(window._SRMXCHANGE_INIT_ROUTE_!=='None') browserHistory.push(BASE_URL+window._SRMXCHANGE_INIT_ROUTE_);

function redirectToLatest(nextState, replaceState){
    replaceState(BASE_URL);
}

const features = [ 
    {
	title:'Question',
	model:'question',
	bsStyle:'primary',
	class:QuestionRow,
	orderings:['-created','-num_votes', '-num_views'],
	comments:true
    },
    {
	title:'Wanted',
	model:'wanted',
	bsStyle:'info',
	class:GenericPanelItem,
	orderings:['-created','-num_views'],
	comments:true
    },
    {
	title:'Available',
	model:'available',
	bsStyle:'success',
	class:GenericPanelItem,
	orderings:['-created','-num_views'],
	comments:true
    },
    {
	title:'Experience Speaks',
	model:'story',
	bsStyle:'',
	class:StoryRow,
	orderings:['-created', '-num_votes', '-num_views'],
	comments:true
    },
    {
	title:'Project',
	model:'project',
	bsStyle:'warning',
	class:GenericThumbnailItem,
	orderings:['-created','-num_views'],
	comments:true
    },
];


const routes = (
	<Route path={BASE_URL} component={Layout}>
	<IndexRoute mainTitle='Latest' component={MultiListViewPage} features={features}/>
	<Route {...features[0]} path='qa' component={ListViewPage} />
	<Route {...features[0]} path='qa/:id' component={SimpleDetailViewPage} />
	<Route {...features[1]} path='wanted'  component={ListViewPage} />
	<Route {...features[1]} path='wanted/:id' component={SimpleDetailViewPage} />
	<Route {...features[2]} path='available' component={ListViewPage} />
	<Route {...features[2]} path='available/:id' component={SimpleDetailViewPage} />
	<Route {...features[3]} path='story' component={ListViewPage} />
	<Route {...features[3]} path='story/:id' component={SimpleDetailViewPage} />
	<Route {...features[4]} path='project' component={ListViewPage} />
	<Route {...features[4]} path='project/:id' component={SimpleDetailViewPage} />
	<Route path='*' component={MultiListViewPage} onEnter={redirectToLatest}/>
	</Route>);

ReactDOM.render(
	<Router history={browserHistory}>
	{routes}
	</Router>
	, app);
