import { Action } from '@ngrx/store';
import { Page } from '../../types';

export const ADD_DOCUMENT_PAGES = 'ADD_DOCUMENT_PAGES';

export class AddDocumentPages implements Action {
    readonly type = ADD_DOCUMENT_PAGES;

    constructor(public payload: {documentId: string, pages: Page[]}){};
}

export type Actions = AddDocumentPages;