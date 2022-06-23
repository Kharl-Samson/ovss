import React from "react";
import "./LoginRegister.css";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Left_Login_Bg from "../../Assets/Login_Register/Login_Left_Bg.png";
import Login_Left_Img from "../../Assets/Login_Register/Login_Left_Img.png";
import Show_Password from "../../Assets/Icons/ShowPassword.png";
import Hide_Password from "../../Assets/Icons/HidePassword.png";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Signup_Page(){

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

//Showing the toggle password icon when the user is typing in the passform textfield
function show_password_toggle(){
    if(document.getElementById("password_input").value.length === 0 ){
        if( document.getElementById('password_input').type === "text"){
            document.getElementById("show_password").style.display = "none"
            document.getElementById("hide_password").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('password_input').type === "password"){
            document.getElementById("show_password").style.display = "block";
            document.getElementById("hide_password").style.display = "none";
        }     
    }
}
//Showing the password
function show_password(){
    document.getElementById('password_input').type = 'text';
    document.getElementById("show_password").style.display = "none"
    document.getElementById("hide_password").style.display = "block"
}
//Hiding the password
function hide_password(){
    document.getElementById('password_input').type = 'password';
    document.getElementById("show_password").style.display = "block";
    document.getElementById("hide_password").style.display = "none";
}


//Remember me time set
var defaultChecked1 = localStorage.getItem("remember_me1");
setTimeout(function(){
    if(localStorage.getItem("remember_me") !=="not_checked" && localStorage.getItem("remember_me") !== null){
        window.localStorage.setItem('remember_me1', "true");
        }
        else{
            window.localStorage.setItem('remember_me1', '');
        }
},500);
 
//Remember me function
function lsRememberMe1() {
    if (document.getElementById('keep_logA').checked) {//If remember me is checked
        window.localStorage.setItem('email_input', document.getElementById("email_input").value);
        window.localStorage.setItem('password_input', document.getElementById("password_input").value);
        window.localStorage.setItem('remember_me', "checked");
        window.localStorage.setItem('remember_me1', "true");
    } 
    else{//If remember me is not checked
        window.localStorage.setItem('email_input', "");
        window.localStorage.setItem('password_input', "");
        window.localStorage.setItem('remember_me', "not_checked");
        window.localStorage.setItem('remember_me1', '');
    }
}

//Close Login Modal
function close_login_modal(){
    document.getElementById("Login_Modal_Container").style.display = "none";
    document.getElementById("email_input").value = "";
    document.getElementById("password_input").value = "";
}


window.onclick = function(event) {
 if (event.target === document.getElementById("Login_Modal_Container")) {
  document.getElementById("Login_Modal_Container").style.display = "none";
  }   
}

return(
  <div className="LoginRegister_Container Login_Modal_Container" id="Login_Modal_Container">
    <div className="LoginForm_Container">
        <div className="left" 
         style={{
            backgroundImage: `url(${Left_Login_Bg})`
        }}
        >
            <div className="top">
              <div>
                <p>Let's protect yourself</p>
                <p>and those around you</p>
                <p>by vaccinating</p>
              </div>
            </div>
            <div className="bottom">
                <img src={Login_Left_Img} alt=""/> 
            </div>
        </div>

        <div className="right">
            <p className="close_login_modal">
            <LightTooltip title="Close">
                <span onClick={close_login_modal}>&#215;</span>
            </LightTooltip>
            </p>

          <div className="right_container">
            <h1>Welcome Back!</h1>
            <p className="new_here_text"><b>New here?</b>&nbsp;&nbsp; <LightTooltip title="Create an account"><span>Sign up</span></LightTooltip></p>

            <p className="label">Email or username</p>
            <input type="text" placeholder="Email or username here" className="email_input" id="email_input" defaultValue={localStorage.getItem("email_input")} required />

            <p className="label" style={{marginTop:"5%"}}>Password</p>
            <div className="password_input_container">
              <input type="password" 
                placeholder="Password here" 
                className="password_input"
                id="password_input"
                onKeyUp={show_password_toggle}
                defaultValue={localStorage.getItem("password_input")}
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

            
            <div className="signIn_btn">
                <button onClick={lsRememberMe1}>Sign in</button>
            </div>

          </div>

        </div>
    </div>
  </div>
)
}
