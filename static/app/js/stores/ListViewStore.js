import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';
import ListViewActionConstants from '../ListViewActionConstants'; 
import axios from 'axios';

var _data = [];

var _model, _page, _ordering, _tags;


function construct_url(){
    const tags = _tags.length>0? _tags.join(','):'';
    return `/api/list/${_model}/?page=${_page}&ordering=${_ordering}&tags=${_tags}`;
}

function fetchListData(){
    axios.get(construct_url()) 
	.then(({data})=> )
	.catch((error)=> console.log(error)); 
}

function loadData(data){
    _data = data;
}

function setModel(model){
    _model = model;
}

class ListViewStore extends EventEmitter{
    getData(){
	return _data;
    }
    
    getModel(){
	return _model;
    }
    // Emit Change event
    emitChange() {
	this.emit('change');
    } 

    // Add change listener
    addChangeListener(callback) {
	this.on('change', callback);
    } 

    // Remove change listener
    removeChangeListener(callback) {
	this.removeListener('change', callback);
    }
}

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ListViewActionConstants.RECIEVE_DATA:
      loadData(action.data);
      break;

    case ListViewActionConstants.SET_MODEL:
      setModel(action.data);
      break;

    default:
      return true;
  };
    ListViewStore.emitChange();
    return true;

});
