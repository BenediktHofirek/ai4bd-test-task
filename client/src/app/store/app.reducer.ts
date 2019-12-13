import { ActionReducerMap } from "@ngrx/store";

import * as fromDocumentsOverview from "../documents-overview/store/documents-overview.reducer";
import * as fromDocumentDetail from "../document-detail/store/document-detail.reducer";

export interface AppState {
  documentNumber: fromDocumentsOverview.State;
  documentPages: fromDocumentDetail.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  documentNumber: fromDocumentsOverview.documentsOverviewReducer,
  documentPages: fromDocumentDetail.documentDetailReducer
};
