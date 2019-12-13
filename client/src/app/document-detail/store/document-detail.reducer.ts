import * as documentDetailActions from "./document-detail.actions";
import { Page } from "../../types";

export interface State {
  documentsPages: { documentId: string; pages: Page[] }[];
}

export function documentsOverviewReducer(
  state: State,
  action: documentDetailActions.Actions
) {
  switch (action.type) {
    case documentDetailActions.ADD_DOCUMENT_PAGES:
      console.log(state);
      return {
        documentsPages: getNewDocumentsPages(
          state.documentsPages,
          action.payload
        )
      };
    default:
      return state;
  }
}

function getNewDocumentsPages(
  prevDocumentsPages: { documentId: string; pages: Page[] }[],
  payload: { documentId: string; pages: Page[] }
) {
  const newDocumentsPages = [...prevDocumentsPages];
  if (prevDocumentsPages.find(doc => doc.documentId === payload.documentId)) {
    const index = prevDocumentsPages.findIndex(
      doc => doc.documentId === payload.documentId
    );
    return newDocumentsPages[index].pages.push(...payload.pages);
  } else {
    return newDocumentsPages.push({
      documentId: payload.documentId,
      pages: payload.pages
    });
  }
}
