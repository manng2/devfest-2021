import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from './features/blocks';
import pageReducer from './features/pages';
import roomsReducer from './features/rooms';
import workspaceReducer from './features/workspace';

export default configureStore({
  reducer: {
    blocks: blocksReducer,
    page: pageReducer,
    rooms: roomsReducer,
    workspace: workspaceReducer
  },
})