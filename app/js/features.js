import QuestionRow from './components/QuestionRow';
import GenericPanelItem from './components/GenericPanelItem';
import GenericThumbnailItem from './components/GenericThumbnailItem';
import StoryRow from './components/StoryRow';

const FEATURES = [ 
    {
	title:'Question',
	model:'question',
	bsStyle:'primary',
	class:QuestionRow,
	orderings:['-created','-num_votes', '-num_views'],
	comments:true,
	votes:true
    },
    {
	title:'Wanted',
	model:'wanted',
	bsStyle:'info',
	class:GenericPanelItem,
	orderings:['-created','-num_views'],
	comments:true,
	votes:false
    },
    {
	title:'Available',
	model:'available',
	bsStyle:'success',
	class:GenericPanelItem,
	orderings:['-created','-num_views'],
	comments:true,
	votes:false
    },
    {
	title:'Experience Speaks',
	model:'story',
	bsStyle:'',
	class:StoryRow,
	orderings:['-created', '-num_votes', '-num_views'],
	comments:true,
	votes:true
    },
    {
	title:'Project',
	model:'project',
	bsStyle:'warning',
	class:GenericThumbnailItem,
	orderings:['-created','-num_views']
    },
];
export default FEATURES;
