import React from "react";
import { appWithTranslation } from "next-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../redux/configureStore";
import "../styles/styles.css";

import initialState from "../redux/reducers/initialState";

const { store, persistor } = configureStore(initialState);

const MyApp = ({ Component, pageProps }) => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </ReduxProvider>
);

export default appWithTranslation(MyApp);
