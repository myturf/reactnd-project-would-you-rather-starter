import {SET_AUTHENTICATED_USER} from '../actions/AuthAction';

export default function authReducer(state = null, action) {
    if (action.type === SET_AUTHENTICATED_USER) {
        return action.id;
    }
    return state;
}
