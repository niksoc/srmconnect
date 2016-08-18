import React from 'react';
import PageTitle from '../components/PageTitle';
import ListView from '../components/ModelViews/ListView';
import GenericPanelItem from '../components/GenericPanelItem';

class Wanted extends React.Component{
    render(){
	return ( 
		<div> 
		<PageTitle title='Wanted' src='/api/create/wanted/' />
		<ListView model='wanted' detail_url='' class={GenericPanelItem} bsStyle='info' />
		</div>
	);
    }
};
export default Wanted;









