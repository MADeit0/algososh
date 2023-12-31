import { Action } from "../actions/list-page.action";

export const events: { [key: string]: boolean } = {
  addEvent: false,
  removeEvent: false,
  addElementAtHeadEvent: false,
  addElementAtTailEvent: false,
  addElementByIndexEvent: false,
  removeElementAtHeadEvent: false,
  removeElementAtTailEvent: false,
  removeElementByIndexEvent: false,
};

export const reducer = (state: typeof events, action: Action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, addEvent: true };
    case "REMOVE_EVENT":
      return { ...state, removeEvent: true };
    case "ADD_ELEMENT_AT_HEAD_EVENT":
      return { ...state, addElementAtHeadEvent: true };
    case "ADD_ELEMENT_AT_TAIL_EVENT":
      return { ...state, addElementAtTailEvent: true };
    case "ADD_ELEMENT_BY_INDEX_EVENT":
      return { ...state, addElementByIndexEvent: true };
    case "REMOVE_ELEMENT_AT_HEAD_EVENT":
      return { ...state, removeElementAtHeadEvent: true };
    case "REMOVE_ELEMENT_AT_TAIL_EVENT":
      return { ...state, removeElementAtTailEvent: true };
    case "REMOVE_ELEMENT_BY_INDEX_EVENT":
      return { ...state, removeElementByIndexEvent: true };
    case "RESET_EVENTS":
      const updatedEvents = Object.fromEntries(
        Object.entries(state).map(([key]) => [key, false])
      );
      return { ...state, ...updatedEvents };
    default:
      return state;
  }
};
