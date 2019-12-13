import * as documentsOverviewActions from "./documents-overview.actions";

export interface State {
  documentNumber: number;
}

export function documentsOverviewReducer(
  state: State,
  action: documentsOverviewActions.Actions
) {
  switch (action.type) {
    case documentsOverviewActions.SET_DOCUMENT_NUMBER:
      console.log(state);
      return {
        ...state,
        documentNumber: action.payload
      };
    default:
      return state;
  }
}
