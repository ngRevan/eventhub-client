import { createAction, props } from '@ngrx/store';
import { EventView } from 'src/app/core/models/event-view';

/* Detail */
export const selectEvent = createAction('[Events] Select', props<{ id: string }>());
export const clearSelectedEvent = createAction('[Events] Clear Selected');

/* Entity */
export const loadEvent = createAction('[Events] Load Event', props<{ eventView: EventView }>());

/* Dialog */
export const openCreateDialog = createAction('[Events] Open Create Dialog');
export const closeCreateDialog = createAction('[Events] Close Create Dialog');

export const openEditDialog = createAction('[Events] Open Edit Dialog');
export const closeEditDialog = createAction('[Events] Close Edit Dialog');

export const openJoinDialog = createAction('[Events] Open Join Dialog');
export const closeJoinDialog = createAction('[Events] Close Join Dialog');

/* API */
export const createEvent = createAction('[Events] Create', props<{ eventView: EventView }>());
export const createEventSuccess = createAction('[Events] Create Success', props<{ id: string }>());
export const createEventFailure = createAction('[Events] Create Failure');

export const updateEvent = createAction('[Events] Update', props<{ eventView: EventView }>());
export const updateEventSuccess = createAction('[Events] Update Success', props<{ id: string }>());
export const updateEventFailure = createAction('[Events] Update Failure');

export const deleteEvent = createAction('[Events] Delete', props<{ id: string }>());
export const deleteEventSuccess = createAction('[Events] Delete Success', props<{ id: string }>());
export const deleteEventFailure = createAction('[Events] Delete Failure');

export const loadMemberEvents = createAction('[Events] Load Member Events');
export const loadMemberEventsSuccess = createAction(
  '[Events] Load Member Events Success',
  props<{ eventViews: EventView[] }>()
);
export const loadMemberEventsFailure = createAction('[Events] Load Member Events Failure');

export const loadNotMemberEvents = createAction('[Events] Load Not Member Events');
export const loadNotMemberEventsSuccess = createAction(
  '[Events] Load Not Member Events Success',
  props<{ eventViews: EventView[] }>()
);
export const loadNotMemberEventsFailure = createAction('[Events] Load Not Member Events Failure');

export const joinEvent = createAction('[Events] Join', props<{ id: string }>());
export const joinEventSuccess = createAction('[Events] Join Success', props<{ id: string }>());
export const joinEventFailure = createAction('[Events] Join Failure');

export const leaveEvent = createAction('[Events] Leave', props<{ id: string }>());
export const leaveEventSuccess = createAction('[Events] Leave Success');
export const leaveEventFailure = createAction('[Events] Leave Failure');
