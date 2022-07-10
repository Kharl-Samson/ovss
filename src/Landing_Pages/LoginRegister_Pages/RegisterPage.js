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

export default function Register_Page(){

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
    if(document.getElementById("user_password_input").value.length === 0 ){
        if( document.getElementById('password_input').type === "text"){
            document.getElementById("show_password_register").style.display = "none"
            document.getElementById("hide_password_register").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('user_password_input').type === "password"){
            document.getElementById("show_password_register").style.display = "block";
            document.getElementById("hide_password_register").style.display = "none";
        }     
    }
}
function show_password_toggle1(){
  if(document.getElementById("user_password_input1").value.length === 0 ){
      if( document.getElementById('password_input1').type === "text"){
          document.getElementById("show_password_register1").style.display = "none"
          document.getElementById("hide_password_register1").style.display = "block"
      }    
  }
  else{
      if(document.getElementById('user_password_input1').type === "password"){
          document.getElementById("show_password_register1").style.display = "block";
          document.getElementById("hide_password_register1").style.display = "none";
      }     
  }
}

//Showing the password
function show_password(){
    document.getElementById('user_password_input').type = 'text';
    document.getElementById("show_password_register").style.display = "none"
    document.getElementById("hide_password_register").style.display = "block"
}
//Hiding the password
function hide_password(){
    document.getElementById('user_password_input').type = 'password';
    document.getElementById("show_password_register").style.display = "block";
    document.getElementById("hide_password_register").style.display = "none";
}
//Showing the password
function show_password1(){
  document.getElementById('user_password_input1').type = 'text';
  document.getElementById("show_password_register1").style.display = "none"
  document.getElementById("hide_password_register1").style.display = "block"
}
//Hiding the password
function hide_password1(){
  document.getElementById('user_password_input1').type = 'password';
  document.getElementById("show_password_register1").style.display = "block";
  document.getElementById("hide_password_register1").style.display = "none";
}


//Close Login Modal
function close_login_modal(){
    document.getElementById("Register_Modal_Container").style.display = "none";
}


//Show Login Modal
function Show_login_modal(){
  document.getElementById("Register_Modal_Container").style.display = "none";
  document.getElementById("Login_Modal_Container").style.display = "flex";
  document.getElementById("email_input").value = localStorage.getItem("email_input");
  document.getElementById("password_input").value = localStorage.getItem("password_input");
}

return(
  <div className="LoginRegister_Container Login_Modal_Container" id="Register_Modal_Container">
    <div className="LoginForm_Container" id="RegisterForm_Container">
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
            <h1>Create new account</h1>
            <p className="new_here_text"><b>Already a member?</b>&nbsp;&nbsp; <span onClick={Show_login_modal}>Sign in</span></p>

           
            <div className="input_register">
              <div className="input_box">
                <p className="label">First Name <span style={{color:"red"}}>*</span></p>
                <input type="text" placeholder="First name here"/>
              </div>

              <div className="input_box">
                <p className="label">Last Name <span style={{color:"red"}}>*</span></p>
                <input type="text" placeholder="Last name here"/>
              </div>
            </div>

            <div className="input_register" style={{flexDirection:"column",marginBottom:"20px"}}>
               <p id="label">Email <span style={{color:"red"}}>*</span></p>
              <input type="email" placeholder="Email here"/>
            </div>
            
            <div className="input_register" style={{flexDirection:"column",marginBottom:"20px"}}>
               <p id="label">Password <span style={{color:"red"}}>*</span></p>
      
               <div className="password_input_container">
                    <input type="password" 
                        placeholder="Password here" 
                        className="password_input_register"
                        id="user_password_input"
                        onKeyUp={show_password_toggle}
                        required
                    />
                    <div className="toggle_password_container">
                        <img src={Show_Password} id="show_password_register" onClick={show_password} alt="" title="Show Password"/>
                        <img src={Hide_Password} id="hide_password_register" onClick={hide_password} alt="" title="Hide Password"/>
                    </div>
                </div>
            </div>
            

            <div className="input_register" style={{flexDirection:"column",marginBottom:"20px"}}>
               <p id="label">Confirm Password <span style={{color:"red"}}>*</span></p>

               <div className="password_input_container">
                    <input type="password" 
                        placeholder="Confirm password here" 
                        className="password_input_register"
                        id="user_password_input1"
                        onKeyUp={show_password_toggle1}
                        required
                    />
                    <div className="toggle_password_container">
                        <img src={Show_Password} id="show_password_register1" onClick={show_password1} alt="" title="Show Password"/>
                        <img src={Hide_Password} id="hide_password_register1" onClick={hide_password1} alt="" title="Hide Password"/>
                    </div>
                </div>
            </div>
            
            <div className="signIn_btn">
                <button>Proceed</button>
            </div>

          </div>

        </div>
    </div>
  </div>
)
}
