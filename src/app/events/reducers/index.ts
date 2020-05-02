import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { chatReducer, ChatState, getChatSelectors } from './chat.reducer';
import { eventReducer, EventState, getEventSelectors } from './event.reducer';
import { eventMemberReducer, EventMemberState, getEventMemberSelectors } from './event-member.reducer';

export interface EventsFeatureState {
  chat: ChatState;
  event: EventState;
  eventMember: EventMemberState;
}

export const eventsFeatureStateKey = 'events';
export interface EventsState {
  [eventsFeatureStateKey]: EventsFeatureState;
}

export const eventsReducers: ActionReducerMap<EventsFeatureState> = {
  chat: chatReducer,
  event: eventReducer,
  eventMember: eventMemberReducer,
};

export const getEventsFeatureState = createFeatureSelector<EventsFeatureState>(eventsFeatureStateKey);

/* Chat */
export const getChatState = createSelector(getEventsFeatureState, state => state.chat);
export const chatSelectors = getChatSelectors(getChatState);
export const getChatMessages = createSelector(
  chatSelectors.selectEntities,
  chatSelectors.getSearchIds,
  (entities, ids) => ids.map(id => entities[id])
);

/* Event */
export const getEventState = createSelector(getEventsFeatureState, state => state.event);
export const eventSelectors = getEventSelectors(getEventState);
export const getSelectedEvent = createSelector(
  eventSelectors.selectEntities,
  eventSelectors.getSelectedId,
  (entities, id) => (id && entities[id]) || undefined
);
export const getMemberEvents = createSelector(
  eventSelectors.selectEntities,
  eventSelectors.getMemberEventIds,
  (entities, ids) => ids.map(id => entities[id])
);

/* Event Members */
export const getEventMemberState = createSelector(getEventsFeatureState, state => state.eventMember);
export const eventMemberSelector = getEventMemberSelectors(getEventMemberState);
export const getEventMembers = createSelector(
  eventMemberSelector.selectEntities,
  eventMemberSelector.getEventId,
  (entities, id) => (id && entities[id]) || undefined
);
