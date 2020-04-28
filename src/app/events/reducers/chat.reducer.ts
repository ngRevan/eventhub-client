import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, createSelector, on } from '@ngrx/store';
import { MessageView } from 'src/app/core/models/message-view';

import { ChatActions, EventActions } from '../actions';

export interface ChatState extends EntityState<MessageView> {
  totalItemCount: number;
  searchIds: string[];
  pageNumber: number;
  hasNextPage: boolean;
}

const adapter = createEntityAdapter<MessageView>();

const initialState: ChatState = adapter.getInitialState({
  totalItemCount: 0,
  searchIds: [],
  pageNumber: 1,
  hasNextPage: false,
});

export const chatReducer = createReducer(
  initialState,

  on(ChatActions.loadMessagesSuccess, (state, { result }) => ({
    ...adapter.setAll(result.items, state),
    pageNumber: result.pageNumber,
    totalItemCount: result.totalItemCount,
    searchIds: result.items.map(m => m.id),
    hasNextPage: result.hasNextPage,
  })),

  on(ChatActions.loadMoreMessagesSuccess, (state, { result }) => ({
    ...adapter.setAll(result.items, state),
    pageNumber: result.pageNumber,
    totalItemCount: result.totalItemCount,
    searchIds: [...result.items.map(m => m.id), ...state.searchIds],
    hasNextPage: result.hasNextPage,
  })),

  on(ChatActions.receiveMessage, (state, { messageView }) => ({
    ...adapter.upsertOne(messageView, state),
    searchIds: [...state.searchIds, messageView.id],
  })),

  on(EventActions.selectEvent, EventActions.clearSelectedEvent, () => initialState)
);

export const getTotalItemCount = (state: ChatState) => state.totalItemCount;
export const getSearchIds = (state: ChatState) => state.searchIds;
export const getPageNumber = (state: ChatState) => state.pageNumber;
export const getHasNextPage = (state: ChatState) => state.hasNextPage;

export function getChatSelectors(selectState: (state: any) => ChatState) {
  return {
    ...adapter.getSelectors(selectState),
    getTotalItemCount: createSelector(selectState, getTotalItemCount),
    getSearchIds: createSelector(selectState, getSearchIds),
    getPageNumber: createSelector(selectState, getPageNumber),
    getHasNextPage: createSelector(selectState, getHasNextPage),
  };
}
