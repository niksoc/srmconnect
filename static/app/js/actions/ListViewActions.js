import ActionConstants from '../ListViewActionConstants';
import AppDispatcher from '../AppDispatcher';

var ListViewActions = {
    recieveData: function(page, tags, ordering){
	AppDispatcher.handleAction({
	    type: ActionConstants.GET_DATA,
	    data: {page, tags, ordering}
	});},
    setModel: function(model){
	AppDispatcher.handleAction({
	    type: ActionConstants.SET_MODEL,
	    data: {model}
	});}
};

export default ListViewActions;
    

				  
