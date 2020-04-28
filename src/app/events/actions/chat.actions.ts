import { createAction, props } from '@ngrx/store';
import { MessageView } from 'src/app/core/models/message-view';
import { PagedListResult } from 'src/app/core/models/paged-list-result';

export const connect = createAction('[Chat] Connect');
export const disconnect = createAction('[Chat] Disconnect');

export const sendMessage = createAction('[Chat] Send Message', props<{ text: string }>());
export const receiveMessage = createAction('[Chat] Receive Message', props<{ messageView: MessageView }>());

export const loadMessages = createAction('[Chat] Load Messages');
export const loadMessagesSuccess = createAction(
  '[Chat] Load Messages Success',
  props<{ result: PagedListResult<MessageView> }>()
);
export const loadMessagesFailure = createAction('[Chat] Load Messages Failure');

export const loadMoreMessages = createAction('[Chat] Load More Messages');
export const loadMoreMessagesSuccess = createAction(
  '[Chat] Load More Messages Success',
  props<{ result: PagedListResult<MessageView> }>()
);
export const loadMoreMessagesFailure = createAction('[Chat] Load More Messages Failure');
