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

if(window.localStorage.hasOwnProperty('route')){
    browserHistory.push(window.localStorage.getItem('route'));
}

browserHistory.listen(function(ev) {
    window.localStorage.setItem('route',ev.pathname);
});


axios.get('/app/get_route/')
    .then(({data})=>{
	browserHistory.push(BASE_URL+data.route);})
    .catch((error)=>0); 

function redirectToLatest(nextState, replaceState){
    replaceState(BASE_URL);
}

const features = [ 
    {
	title:'Question',
	model:'question',
	bsStyle:'primary',
	class:QuestionRow
    },
    {
	title:'Wanted',
	model:'wanted',
	bsStyle:'info',
	class:GenericPanelItem
    },
    {
	title:'Available',
	model:'available',
	bsStyle:'success',
	class:GenericPanelItem
    },
    {
	title:'Experience Speaks',
	model:'story',
	bsStyle:'',
	class:StoryRow
    },
    {
	title:'Project',
	model:'project',
	bsStyle:'warning',
	class:GenericThumbnailItem
    },
];


const routes = (
	<Route path={BASE_URL} component={Layout}>
	<IndexRoute mainTitle='Latest' component={MultiListViewPage} features={features}/>
	<Route title='Question' class={QuestionRow} path='qa' model='question' 
		bsStyle='primary' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route title='Wanted' class={GenericPanelItem} path='wanted' model='wanted' 
		bsStyle='info' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route title='Wanted' class={GenericPanelItem} path='wanted/:id' model='wanted' 
		bsStyle='info' component={SimpleDetailViewPage} />
	<Route title='Available' class={GenericPanelItem} path='available' model='available' 
		bsStyle='success' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route title='Project' class={GenericThumbnailItem} path='project' model='project' 
		bsStyle='warning' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route title='Event' class={GenericThumbnailItem} path='event' model='event' 
		bsStyle='info' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route title='Experience Speaks' class={StoryRow} path='story' model='story' 
		bsStyle='info' orderings={['-created','-num_views']} component={ListViewPage} />
	<Route path='*' component={MultiListViewPage} onEnter={redirectToLatest}/>
	</Route>);

ReactDOM.render(
	<Router history={browserHistory}>
	{routes}
	</Router>
	, app);
