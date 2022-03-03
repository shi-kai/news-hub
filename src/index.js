import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Spaceflight from "./routes/Spaceflight";
import Inshorts from "./routes/Inshorts";
import InshortsCategory from "./routes/InshortsCategory";
import GNews from "./routes/GNews";
import Currents from "./routes/Currents";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="spaceflight" element={<Spaceflight />} />
          <Route path="inshorts" element={<Inshorts />}>
            <Route path=":categroy" element={<InshortsCategory />} />
          </Route>
          <Route path="gnews" element={<GNews />} />
          <Route path="currents" element={<Currents />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
