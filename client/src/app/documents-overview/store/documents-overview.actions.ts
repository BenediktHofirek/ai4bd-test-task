import { Action } from '@ngrx/store';

export const SET_DOCUMENT_NUMBER = 'SET_DOCUMENT_NUMBER';

export class SetDocumentNumber implements Action {
	readonly type = SET_DOCUMENT_NUMBER;

	constructor(public payload: number) {}
}

export type Actions = SetDocumentNumber;