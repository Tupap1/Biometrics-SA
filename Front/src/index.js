import React from "react";
import ReactDom from "react-dom/client";
import { Login } from "./login";
import { API } from "./API";
import { Biometria } from "./biometria";
import {GlobalProvider} from './context/GlobalContext'

const root =ReactDom.createRoot( document.getElementById("root"));



root.render(
    <>
<Biometria /> 
    </>
);