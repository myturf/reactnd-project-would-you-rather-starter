import thunk from 'redux-thunk';
import loggerMw from './LoggerMw';
import {applyMiddleware} from 'redux';

export default applyMiddleware(thunk, loggerMw);
