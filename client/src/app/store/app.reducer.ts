import { ActionReducerMap } from "@ngrx/store";

import * as fromDocumentsOverview from "../documents-overview/store/documents-overview.reducer";

export interface AppState {
  documentNumber: fromDocumentsOverview.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  documentNumber: fromDocumentsOverview.documentsOverviewReducer
};
