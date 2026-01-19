import { observer } from "mobx-react-lite";
import { AccountView } from "../views/accountView";
import { playClose, playOpen } from "../utilities";
import { userLogIn, UserLogOut, userRegistration, getCurrentUser } from "../firebaseModel";

const Account = observer(

    function StartRender(props) {
        

        function AccountUsernameACB(username){
            props.model.username = username

        }

        function AccountPasswordACB(password){
            props.model.password = password;


        }
        
        async function AccountLogInACB(){
        const username = props.model.username;
        const password = props.model.password;

        if (!username || !password || password.length < 6) {
            alert("You need a valid username and a minimum of6 characters");
            return;
        }

        try {
            await userLogIn(username, password);
            props.model.currentUser = await getCurrentUser();
            console.log("Logged in!");
        } catch (err) {
            console.error(err.message);
            alert("Login failed: " + err.message);
        }
    }

    async function AccountRegisterACB(){
        const username = props.model.username;
        const password = props.model.password;

        if (!username || !password || password.length < 6) {
            alert("You need a valid username and a minimum of6 characters");
            return;
        }

        try {
            await userRegistration(username, password);
            props.model.currentUser = await getCurrentUser();
            console.log("Account created!");
        } catch (err) {
            console.error(err.message);
            alert("Registration failed: " + err.message);
        }
    }

        async function AccountLogOutACB() {
            try {
                await UserLogOut();
                props.model.currentUser = null;
                console.log("Logged out!");
            } catch (err) {
                console.error("Logout error:", err.message);
            }
        }

        function turnOffAccountACB(){
            playClose();
            props.model.closePane();

        }
        


        function profileSwitch(direction){
            var list = props.model.profileIcons;
            var index = list.indexOf(props.model.selectedProfileIcon);

            index = (index + direction + list.length) % list.length;
            
            props.model.selectedProfileIcon = list[index];
            playOpen();

        }

        function LeftProfileSwitchACB(){
            profileSwitch(-1)
        }

        function RightProfileSwitchACB(){
            profileSwitch(1)
            
        }

        return(
            <AccountView
            onClosePane={turnOffAccountACB}
            onLeftProfileLogo={LeftProfileSwitchACB}
            onRightProfileLogo={RightProfileSwitchACB}
            onLogIn={AccountLogInACB}
            onLogOut={AccountLogOutACB}
            onRegister={AccountRegisterACB}
            onPasswordInput={AccountPasswordACB}
            onUsernameInput={AccountUsernameACB}
            profilePicture={props.model.selectedProfileIcon}
            username={props.model.username}
            password={props.model.password}
            currentUser={props.model.currentUser}
            highscore={props.model.highscore}


            />

        );
    });

export { Account };
