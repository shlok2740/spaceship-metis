import React from "react";
import ReactDOM from "react-dom";

import "./styles/normalize.css";
import "./styles/index.css";

import SpaceShip from "./components/SpaceShip";

// ReactDOM.render(
//   <React.StrictMode>
//     <SpaceShip bgColor='#141622' />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SpaceShip bgColor="#141622" />
    </React.StrictMode>
);
