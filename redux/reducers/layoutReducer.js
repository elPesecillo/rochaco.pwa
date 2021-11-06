import * as types from "../constants/actionTypes";
import initialState from "./initialState";
export default function layoutReducer(state = initialState.layout, action) {
  switch (action.type) {
    case types.TOGGLE_MENU:
      return { ...state, menuCollapsed: !action.collapsed };
    case types.SET_MENU_ICON:
      return { ...state, menuIcon: action.menuIcon };
    case types.SET_MENU_TITLE:
      return { ...state, menuTitle: action.menuTitle };
    case types.MENU_COLLAPSE:
      return { ...state, collapsedOption: action.menuCollapsed };
    default:
      return state;
  }
}
