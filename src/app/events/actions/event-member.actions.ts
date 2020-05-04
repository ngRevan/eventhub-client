import { createAction, props } from '@ngrx/store';
import { EventMemberView } from 'src/app/core/models/event-member-view';

/* Detail */
export const selectEventMember = createAction('[EventMembers] Select', props<{ userId: string }>());
export const clearSelectedEventMember = createAction('[EventMembers] Clear Selected');

/* API */
export const loadMembers = createAction('[EventMembers] Load Members', props<{ eventId: string }>());
export const loadMembersSuccess = createAction(
  '[EventMembers] Load Members Success',
  props<{ eventMemberViews: EventMemberView[] }>()
);
export const loadMembersFailure = createAction('[EventMembers] Load Members Failure');
