export enum ActionTypes {
  ADD_EVENT = "ADD_EVENT",
  REMOVE_EVENT = "REMOVE_EVENT",
  ADD_ELEMENT_AT_HEAD_EVENT = "ADD_ELEMENT_AT_HEAD_EVENT",
  ADD_ELEMENT_AT_TAIL_EVENT = "ADD_ELEMENT_AT_TAIL_EVENT",
  ADD_ELEMENT_BY_INDEX_EVENT = "ADD_ELEMENT_BY_INDEX_EVENT",
  REMOVE_ELEMENT_AT_HEAD_EVENT = "REMOVE_ELEMENT_AT_HEAD_EVENT",
  REMOVE_ELEMENT_AT_TAIL_EVENT = "REMOVE_ELEMENT_AT_TAIL_EVENT",
  REMOVE_ELEMENT_BY_INDEX_EVENT = "REMOVE_ELEMENT_BY_INDEX_EVENT",
  RESET_EVENTS = "RESET_EVENTS",
}

export type Action =
  | { type: ActionTypes.ADD_EVENT }
  | { type: ActionTypes.REMOVE_EVENT }
  | { type: ActionTypes.ADD_ELEMENT_AT_HEAD_EVENT }
  | { type: ActionTypes.ADD_ELEMENT_AT_TAIL_EVENT }
  | { type: ActionTypes.ADD_ELEMENT_BY_INDEX_EVENT }
  | { type: ActionTypes.REMOVE_ELEMENT_AT_HEAD_EVENT }
  | { type: ActionTypes.REMOVE_ELEMENT_AT_TAIL_EVENT }
  | { type: ActionTypes.REMOVE_ELEMENT_BY_INDEX_EVENT }
  | { type: ActionTypes.RESET_EVENTS };

export type Events<T> = {
  addEvent: T;
  removeEvent: T;
  addElementAtHeadEvent: T;
  addElementAtTailEvent: T;
  addElementByIndexEvent: T;
  removeElementAtHeadEvent: T;
  removeElementAtTailEvent: T;
  removeElementByIndexEvent: T;
};
