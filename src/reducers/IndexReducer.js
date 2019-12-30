import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import questionsReducer from './QuestionsReducer';
import usersReducer from './UsersReducer';

export default combineReducers({
    authUser: authReducer,
    questions: questionsReducer,
    users: usersReducer
});
