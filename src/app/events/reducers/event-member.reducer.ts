import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { EventMemberView } from 'src/app/core/models/event-member-view';
import { createReducer, on, createSelector } from '@ngrx/store';

import { EventMemberActions } from '../actions';

export interface EventMemberState extends EntityState<EventMemberView> {
  eventId: string | undefined;
}

const adapter = createEntityAdapter<EventMemberView>();

const initialState: EventMemberState = adapter.getInitialState({
  eventId: undefined,
});

export const eventMemberReducer = createReducer(
  initialState,

  on(EventMemberActions.loadMembers, (state, { eventId }) => ({
    ...state,
    eventId,
  })),

  on(EventMemberActions.loadMembersSuccess, (state, { eventMemberViews }) =>
    adapter.upsertMany(eventMemberViews, state)
  )
);

export const getEventId = (state: EventMemberState) => state.eventId;

export function getEventMemberSelectors(selectState: (state: any) => EventMemberState) {
  return {
    ...adapter.getSelectors(selectState),
    getEventId: createSelector(selectState, getEventId),
  };
}
