import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function (state = initialState.payments, action) {
  switch (action.type) {
    case types.LOAD_PAYMENT_BY_ADDRESS_SUCCESS:
      return { ...state, paymentBalanceBySuburb: action.payments };
    case types.LOAD_PAYMENT_PERIODS_SUCCESS:
      return { ...state, paymentPeriods: action.paymentPeriods };
    case types.SET_TOTAL_AMOUNT:
      return { ...state, totalAmount: action.totalAmount };
    case types.UPLOAD_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentPeriods: state.paymentPeriods.filter((r) =>
          action.paymentPeriod.some((pp) => pp !== r.date)
        ),
      };
    case types.LOAD_PAYMENT_BALANCE_SUCCESS:
      return { ...state, paymentBalance: action.obj };
    case types.LOAD_PAYMENT_HISTORY_SUCCESS:
      return {
        ...state,
        paymentHistory: action.paymentHistory,
      };
    case types.APPROVE_REJECT_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentBalanceBySuburb: state.paymentBalanceBySuburb.map((r) =>
          r._id == action.obj.id
            ? { ...r, payStatus: action.obj.approved }
            : { ...r }
        ),
        paymentBalance:
          action.obj.approved == "approved"
            ? {
                ...state.paymentBalance,
                balance: (
                  parseFloat(state.paymentBalance.balance) +
                  parseFloat(action.obj.amount)
                ).toString(),
              }
            : { ...state.paymentBalance },
      };
    default:
      return state;
  }
}
