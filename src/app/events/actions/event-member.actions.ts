import { createAction, props } from '@ngrx/store';
import { EventMemberView } from 'src/app/core/models/event-member-view';

/* API */
export const loadMembers = createAction('[EventMembers] Load Members', props<{ eventId: string }>());
export const loadMembersSuccess = createAction(
  '[EventMembers] Load Members Success',
  props<{ eventMemberViews: EventMemberView[] }>()
);
export const loadMembersFailure = createAction('[EventMembers] Load Members Failure');
