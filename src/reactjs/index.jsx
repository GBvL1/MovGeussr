
import {createRoot} from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";
import { reactiveModel } from "../mobxReactiveModel.js"



const root = createRoot(document.getElementById("root"));

root.render(<ReactRoot model= {reactiveModel}/>);
