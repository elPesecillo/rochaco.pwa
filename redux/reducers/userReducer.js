import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.user, action) {
  switch (action.type) {
    case types.ADD_USER_FAV_SUCCESS:
      return {
        ...state,
        favs: state.favs
          .filter(
            (fav) => !action.favs.some((newFav) => newFav.name === fav.name)
          )
          .concat(action.favs),
      };
    //return { ...state, favs: [...state.favs, ...action.favs] };
    case types.REMOVE_USER_FAV_SUCCESS:
      return {
        ...state,
        favs: state.favs.filter(
          (fav) => !action.favs.some((rFav) => rFav.name === fav.name)
        ),
      };
    //return { ...state, favs: [...state.favs, ...action.favs] };
    case types.LOAD_USER_FAVS_SUCCESS:
      return { ...state, favs: action.favs };
    case types.ADD_USER_GUEST:
      return {
        ...state,
        guests: [
          ...state.guests,
          ...action.guests.filter((g) => {
            let exists = state.guests.filter(
              (ng) => ng.name.trim() === g.name.trim()
            );
            return exists.length === 0;
          }),
        ],
      };
    case types.REMOVE_USER_GUEST:
      return {
        ...state,
        guests: [
          ...state.guests.filter((g) => {
            let exists = action.guests.filter(
              (ng) => ng.name.trim() === g.name.trim()
            );
            return exists.length === 0;
          }),
        ],
      };
    case types.CLEAN_USER_GUEST:
      return { ...state, guests: [] };
    case types.UPDATE_USER_GUEST:
      return {
        ...state,
        guests: state.guests.map((g) =>
          g.name === action.guest.name ? { ...g, ...action.guest } : { ...g }
        ),
      };
    case types.GET_SUBURB_DATA_SUCCESS:
      return { ...state, suburb: action.suburb };
    case types.ADD_SUBURB_INVITE_SUCCESS:
      return { ...state, suburbInvite: action.suburbInvite };
    case types.CLEAR_SUBURB_INVITE:
      return { ...state, suburbInvite: "" };
    case types.GET_INVITE_BY_CODE_SUCCESS:
      return { ...state, inviteSignIn: action.inviteSignIn };
    case types.CLEAN_USER_INVITE:
      return { ...state, inviteSignIn: null };
    case types.GET_USER_INFO_SUCCESS:
      return { ...state, data: action.data };
    case types.GET_TERMS_SUCCESS:
      return { ...state, terms: action.terms };
    case types.SING_TERMS_SUCCESS:
      return { ...state, terms: action.terms };
    case types.GENERATE_TEMP_PASS_SUCCESS:
      return state;
    case types.SET_TEMPORARY_PASS:
      return {
        ...state,
        isPasswordTemporary: action.isTemporary,
        tempPass: null,
      };
    case types.SAVE_TEMP_PASS:
      return { ...state, tempPass: action.tempPass };
    case types.UPDATE_USER_PICTURE_SUCCESS:
      return { ...state, data: { ...state.data, photoUrl: action.photoUrl } };
    default:
      return state;
  }
}
