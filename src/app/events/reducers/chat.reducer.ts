import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, createSelector, on } from '@ngrx/store';
import { MessageView } from 'src/app/core/models/message-view';
import { ChatActions, EventActions } from '../actions';

export interface ChatState extends EntityState<MessageView> {
  searchIds: string[];
}

const adapter = createEntityAdapter<MessageView>();

const initialState: ChatState = adapter.getInitialState({
  searchIds: [],
});

export const chatReducer = createReducer(
  initialState,

  on(ChatActions.loadMessages, state => ({
    ...state,
    pageSize: 20,
    pageNumber: 1,
  })),

  on(ChatActions.loadMessagesSuccess, (state, { messageViews }) => ({
    ...adapter.setAll(messageViews, state),
    searchIds: messageViews.map(m => m.id),
  })),

  on(ChatActions.receiveMessage, (state, { messageView }) => ({
    ...adapter.upsertOne(messageView, state),
    searchIds: [...state.searchIds, messageView.id],
  })),

  on(EventActions.selectEvent, EventActions.clearSelectedEvent, () => initialState)
);

export const getSearchIds = (state: ChatState) => state.searchIds;

export function getChatSelectors(selectState: (state: any) => ChatState) {
  return {
    ...adapter.getSelectors(selectState),
    getSearchIds: createSelector(selectState, getSearchIds),
  };
}
