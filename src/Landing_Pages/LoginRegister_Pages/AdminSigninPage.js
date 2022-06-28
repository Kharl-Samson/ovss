import React from "react";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Admin_Login_Bg from "../../Assets/Login_Register/Admin_Login_Bg.png";
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Show_Password from "../../Assets/Icons/ShowPassword.png";
import Hide_Password from "../../Assets/Icons/HidePassword.png";
import Warning_Icon from "../../Assets/Icons/Warning_Icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Url from "../../Functions/Url";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AdminSignin_Page(){
let navigate = useNavigate();

//Calling the url of announcement
Url();

//Removing local storage
localStorage.removeItem("admin_login_email");

//Tooltip
const LightTooltip = styled(({ className, ...props }) => (
<Tooltip {...props} classes={{ popper: className }}/>
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
         backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
        fontSize: ".8rem",
    },
}));   

//Loading the logo and the title on the Tab of the browser
document.querySelector("link[rel='shortcut icon']").href = TabLogo;
document.title = "OVSS | Administration Sign in";

//Showing the toggle password icon when the user is typing in the passform textfield
function show_password_toggle(){
    if(document.getElementById("admin_password_input").value.length === 0 ){
        if( document.getElementById('admin_password_input').type === "text"){
            document.getElementById("show_password").style.display = "none"
            document.getElementById("hide_password").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('admin_password_input').type === "password"){
            document.getElementById("show_password").style.display = "block";
            document.getElementById("hide_password").style.display = "none";
        }     
    }
}
//Showing the password
function show_password(){
    document.getElementById('admin_password_input').type = 'text';
    document.getElementById("show_password").style.display = "none"
    document.getElementById("hide_password").style.display = "block"
}
//Hiding the password
function hide_password(){
    document.getElementById('admin_password_input').type = 'password';
    document.getElementById("show_password").style.display = "block";
    document.getElementById("hide_password").style.display = "none";
}

//Remember me time set
var defaultChecked1 = localStorage.getItem("remember_me1_admin");
setTimeout(function(){
    if(localStorage.getItem("remember_me_admin") !=="not_checked" && localStorage.getItem("remember_me_admin") !== null){
        window.localStorage.setItem('remember_me1_admin', "true");
    }
    else{
        window.localStorage.setItem('remember_me1_admin', '');
    }
},500);

//Remember me function
function lsRememberMe1() {
    if (document.getElementById('keep_logA').checked) {//If remember me is checked
        window.localStorage.setItem('admin_email_input', document.getElementById("admin_email_input").value);
        window.localStorage.setItem('admin_password_input', document.getElementById("admin_password_input").value);
        window.localStorage.setItem('remember_me_admin', "checked");
        window.localStorage.setItem('remember_me1_admin', "true");
    } 
    else{//If remember me is not checked
        window.localStorage.setItem('admin_email_input', "");
        window.localStorage.setItem('admin_password_input', "");
        window.localStorage.setItem('remember_me_admin', "not_checked");
        window.localStorage.setItem('remember_me1_admin', '');
    }
}

//Function close validation 
function close_validation(){
    document.getElementById("login_validation").style.display = "none";
}

const submitForm=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
        email: document.getElementById("admin_email_input").value,
        password: document.getElementById("admin_password_input").value,
    }
   
    document.getElementById("progress_btn").style.display = "block";
    document.getElementById("sign_in_Text").style.display =  "none";
    axios.post(localStorage.getItem("url_hosting")+'Admin_Login.php',sendData)
    .then((result)=>{
       
        if(result.data.status === "Admin Login"){
           document.getElementById("progress_btn").style.display = "none";
           document.getElementById("sign_in_Text").style.display =  "block";

           window.localStorage.setItem('admin_login_email', result.data.email);
           navigate(`/Administration_Dashboard`);
        }
        else if(result.data.status === "Invalid"){ //If username or password is invalid
            document.getElementById("progress_btn").style.display = "none";
            document.getElementById("sign_in_Text").style.display =  "block";

            document.getElementById("validation_text").textContent = "Email/username or password are invalid!"
            document.getElementById("login_validation").style.display = "flex";
        }

    })    
}

    return(
    <div className="admin_login_container"
      style={{
        backgroundImage: `url(${Admin_Login_Bg})`
      }}
    >

        <div className="box">
            <h1>Admin Login</h1>

            <form onSubmit={submitForm}>
            <div className="form_container">
                <p>Email or username</p>
                <input type="text" placeholder="Email or username here" className="email_input" id="admin_email_input" defaultValue={localStorage.getItem("admin_email_input")} onChange={close_validation} required />
            </div>

            <div className="form_container" style={{marginTop:"5%"}}>
                <p>Password</p>
                <div className="password_input_container">
                    <input type="password" 
                        placeholder="Password here" 
                        className="password_input"
                        id="admin_password_input"
                        onKeyUp={show_password_toggle}
                        onChange={close_validation}
                        defaultValue={localStorage.getItem("admin_password_input")}
                        required
                    />
                    <div className="toggle_password_container">
                        <img src={Show_Password} id="show_password" onClick={show_password} alt="" title="Show Password"/>
                        <img src={Hide_Password} id="hide_password" onClick={hide_password} alt="" title="Hide Password"/>
                    </div>
                </div>

                <div className="rememberMe_ForgotPassword">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div className="left">
                        <Checkbox
                        defaultChecked={defaultChecked1} 
                        id="keep_logA"
                        {...label}
                        sx={{
                        color: blue[400],
                        '&.Mui-checked': {
                        color: blue[600],
                        },
                        padding: 0,
                        margin: 0,
                        }}
                        />
                        Remember me
                    </div>
                    <div className="right"><span>Forgot Password?</span></div>
                </Grid>   
                </div>

                <div className="login_validation" id="login_validation">
                    <img src={Warning_Icon} alt=""/>
                    <p id="validation_text">!</p>
                </div>

                <div className="signIn_btn">
                    <button type="submit" onClick={lsRememberMe1}>
                        <CircularProgress color="inherit" id="progress_btn"/>
                        <span id="sign_in_Text">Sign in</span>
                    </button>
                </div>
            </div>
            </form>
        </div>
       

    </div>
    )
}
