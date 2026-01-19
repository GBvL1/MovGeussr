import { Start } from "./startPresenter.jsx";

import { TopBar } from "./topBarPresenter.jsx";
import { observer } from "mobx-react-lite";
import { SuspenseView } from "../views/suspenseView.jsx";
import { Account } from "./accountPresenter.jsx";
import { Settings } from "./settingsPresenter.jsx";
import { Leaderboard } from "./leaderboardPresenter.jsx";
import { Game } from "./gamePresenter.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";

const routerCache = new WeakMap();

function makeRouter(model){
    let router = routerCache.get(model);
    if (!router){
        router = createHashRouter([
        { path: "/", element: <Start model={model} /> },
        { path: "/start", element: <Start model={model} /> },
        { path: "/game", element: <Game model={model} /> },
    
        ]);

        routerCache.set(model, router);
    }

    return router;
}

export const ReactRoot = observer(
    function ReactRoot(props){
        const pane = props.model.currentPane;

        if (!props.model.ready){
            return <SuspenseView promise = "suspense" />;
        }
        
        const router = makeRouter(props.model);

        return (
            <>
            
            <RouterProvider router={router}/>
            
            <div style={{position: "relative"}}>
                <TopBar model={props.model} className="topBarLayering" />
            </div>

            {pane == "settings" && (
                <Settings model={props.model} className="paneLayering"/>
            )}
            
            {pane == "account" && (
                <Account model={props.model} className="paneLayering"/>
            )}
            
            {pane == "leaderboard" && (
                <Leaderboard model={props.model} className="paneLayering"/>
            )}
            </>
        );
    }
) 
