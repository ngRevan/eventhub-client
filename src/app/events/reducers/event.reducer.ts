import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, createSelector, on } from '@ngrx/store';
import { EventView } from 'src/app/core/models/event-view';

import { EventActions } from '../actions';

export interface EventState extends EntityState<EventView> {
  selectedId: string | undefined;
  memberEventIds: string[];
}

const adapter = createEntityAdapter<EventView>();

const initialState: EventState = adapter.getInitialState({
  selectedId: undefined,
  memberEventIds: [],
});

export const eventReducer = createReducer(
  initialState,

  on(EventActions.selectEvent, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),

  on(EventActions.clearSelectedEvent, state => ({
    ...state,
    selectedId: undefined,
  })),

  on(EventActions.loadEvent, (state, { eventView }) => adapter.upsertOne(eventView, state)),

  on(EventActions.loadMemberEventsSuccess, (state, { eventViews }) => ({
    ...adapter.upsertMany(eventViews, state),
    memberEventIds: eventViews.map(e => e.id),
  })),

  on(EventActions.deleteEventSuccess, (state, { id }) => adapter.removeOne(id, state))
);

export const getSelectedId = (state: EventState) => state.selectedId;
export const getMemberEventIds = (state: EventState) => state.memberEventIds;

export function getEventSelectors(selectState: (state: any) => EventState) {
  return {
    ...adapter.getSelectors(selectState),
    getSelectedId: createSelector(selectState, getSelectedId),
    getMemberEventIds: createSelector(selectState, getMemberEventIds),
  };
}
