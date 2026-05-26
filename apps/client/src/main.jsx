import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyANyN-NnlH-Yum-ZtCiegASg7MGlxOqN4A",
  authDomain: "technira-d6e2c.firebaseapp.com",
  projectId: "technira-d6e2c",
  storageBucket: "technira-d6e2c.firebasestorage.app",
  messagingSenderId: "623031336384",
  appId: "1:623031336384:web:0f25be86fc255deb149c25",
  measurementId: "G-7MJRDBNKEV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

