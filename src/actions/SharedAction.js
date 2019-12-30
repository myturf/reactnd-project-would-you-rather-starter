import {getInitialData} from '../misc/ProxyApi';
import {receiveQuestions} from './QuestionsAction';
import {receiveUsers} from './UsersAction';

export function handleInitialData() {
    return dispatch => {
        return getInitialData().then(({users, questions}) => {
            dispatch(receiveQuestions(questions));
            dispatch(receiveUsers(users));
        });
    };
}
