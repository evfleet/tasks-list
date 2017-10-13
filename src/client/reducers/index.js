import { combineReducers } from 'redux';

import auth from './auth';
import tasks from './tasks';
import ui from './ui';

export default combineReducers({
  auth,
  tasks,
  ui
});