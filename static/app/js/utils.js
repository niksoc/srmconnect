import axios from 'axios';

export var tagStore = [];

export function fetchAndStoreTagData(tag_id){
    if(!tagStore.some((item)=>item.pk===tag_id)){ 
	axios.get(`/api/detail/tag/${tag_id}/`) 
	    .then(({data})=> {
		if(!tagStore.some((item)=>item.pk===data.pk)){ 
		    tagStore.push({pk:data.pk, name:data.fields.name});
		} 
		console.log(tagStore);
	    })
	    .catch((error)=> console.error(error)); 
    }
}
	 
