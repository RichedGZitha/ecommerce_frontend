import {actionCreators} from "../state/actions/actionCreators";

// search update
const updateSearch = (search, dispach)=>{

	dispach(actionCreators.updateSearchBarActionCreator(search));
}


export {updateSearch};