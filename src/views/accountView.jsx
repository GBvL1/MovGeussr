import "/src/style.css"

function Pane({children}){
    return (
        <div className="pane">
            {children}
        </div>
    );
}

function Profile(props){
    const profilePicture = props.profilePicture;

    function leftSwitchIcon(){props.onLeftProfileLogo();}
    function rightSwitchIcon(){props.onRightProfileLogo();}
    function accountLogOutACB(){props.onLogOut();}

    return(
        <div>
            <h2 className="paneTitle">Account</h2>

            <div className="profileContainer">
                <div className="profilePictureWrapper">
                <img
                    className="profilePicture"
                    src={profilePicture}
                    alt="ProfilePicture"
                />

                <div className="profileSwitchRow">
                    <button className="profileButton" onClick={rightSwitchIcon}>{"<"}</button>
                    <button className="profileButton" onClick={leftSwitchIcon}>{">"}</button>
                </div>
            </div>
                <h2 className="accountName">{props.username}</h2>
                <h2 className="accountHighscore">Highscore: {props.highscore} Correct</h2>
                <button
                    className="logInOutButton"
                    onClick={accountLogOutACB}
                    >Log Out
                </button>

                </div>

        </div>

    );
}

function LogIn(props){
    function usernameInputACB(event){props.onUsernameInput(event.target.value);}
    function passwordInputACB(event){props.onPasswordInput(event.target.value);}
    function accountLogInACB(){props.onLogIn();}
    function accountRegisterACB(){ props.onRegister(); }

    return(
        <div>
            <h2 className="paneTitle">Log In</h2>
            <div className="profileContainer">

                <input
                    type="text"
                    className="accountInput"
                    placeholder="Username"
                    onChange={usernameInputACB}
                    value={props.username || ""}

                />

                <input
                    type="password"
                    className="accountInput"
                    placeholder="Password"
                    onChange={passwordInputACB}
                    value={props.password || ""}

                />

                    <div className="logInOutGroup">
                        <button 
                            className="logInOutButton"
                            onClick={accountLogInACB}
                            >Log In
                        </button>

                        <button 
                            className="logInOutButton"
                            onClick={accountRegisterACB}
                            >Register
                        </button>
                    </div>

            </div>
        </div>
    )

}

export function AccountView(props) {
    function turnOffAccountACB(){props.onClosePane();}

    const UserOnline = !!props.currentUser;
    return(
        <div className="paneLayering">
            <Pane>
                <button
                    onClick={turnOffAccountACB}
                    className="closeButton">
                    X
                </button>
                {UserOnline ? (
                    <Profile
                        profilePicture={props.profilePicture}
                        username={props.username}
                        highscore={props.highscore}
                        onLeftProfileLogo={props.onLeftProfileLogo}
                        onRightProfileLogo={props.onRightProfileLogo}
                        onLogOut={props.onLogOut}
                    />
                ) : (
                    <LogIn
                        username={props.username}
                        password={props.password}
                        onUsernameInput={props.onUsernameInput}
                        onPasswordInput={props.onPasswordInput}
                        onLogIn={props.onLogIn}
                        onRegister={props.onRegister}
                    />
                )}


            </Pane>


        </div>
    )



}
