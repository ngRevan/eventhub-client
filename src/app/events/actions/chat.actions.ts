import { createAction, props } from '@ngrx/store';
import { MessageView } from 'src/app/core/models/message-view';

export const connect = createAction('[Chat] Connect');
export const disconnect = createAction('[Chat] Disconnect');

export const sendMessage = createAction('[Chat] Send Message', props<{ text: string }>());
export const receiveMessage = createAction('[Chat] Receive Message', props<{ messageView: MessageView }>());

export const loadMessages = createAction('[Chat] Load Messages');
export const loadMessagesSuccess = createAction(
  '[Chat] Load Messages Success',
  props<{ messageViews: MessageView[] }>()
);
export const loadMessagesFailure = createAction('[Chat] Load Messages Failure');
