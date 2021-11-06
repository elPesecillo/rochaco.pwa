export default {
  apiCallsInProgress: 0,
  layout: {
    menuCollapsed: true,
    menuTitle: "",
    menuIcon: "icon-home",
    collapsedOption: "",
  },
  user: {
    favs: [],
    guests: [],
    suburb: {},
    suburbInvite: "",
    inviteSignIn: null,
    data: null,
    terms: {},
    isPasswordTemporary: false,
    tempPassword: null,
  },
  auth: "",
  searchVisit: {
    streets: [],
    streetNumbers: [],
    usersInAddress: [],
    pendingVisits: [],
    pendingVisitSelected: null,
  },
  suburbConfig: {},
};
