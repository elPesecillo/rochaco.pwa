import * as types from "../constants/actionTypes";

export function toggleMenu(collapsed) {
  return { type: types.TOGGLE_MENU, collapsed };
}

export function setMenuIcon(menuIcon) {
  return { type: types.SET_MENU_ICON, menuIcon };
}

export function setMenuTitle(menuTitle) {
  return { type: types.SET_MENU_TITLE, menuTitle };
}
