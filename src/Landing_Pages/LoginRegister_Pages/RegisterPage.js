import React ,{ useEffect, useState } from "react";
import axios from "axios";
import "./LoginRegister.css";
import validator from 'validator';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Left_Login_Bg from "../../Assets/Login_Register/Login_Left_Bg.png";
import Login_Left_Img from "../../Assets/Login_Register/Login_Left_Img.png";
import Show_Password from "../../Assets/Icons/ShowPassword.png";
import Hide_Password from "../../Assets/Icons/HidePassword.png";
import CircularProgress from '@mui/material/CircularProgress';
import ValidatorSlideModal from "../../Modals/ValidatorSlideModal";
import Done_Icon from "../../Assets/Icons/Done_Icon.png";

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
    if(document.getElementById("add_register_password").value.length === 0 ){
        if( document.getElementById('add_register_password').type === "text"){
            document.getElementById("show_password_register").style.display = "none"
            document.getElementById("hide_password_register").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('add_register_password').type === "password"){
            document.getElementById("show_password_register").style.display = "block";
            document.getElementById("hide_password_register").style.display = "none";
        }     
    }
}
function show_password_toggle1(){
  if(document.getElementById("add_register_password1").value.length === 0 ){
      if( document.getElementById('add_register_password1').type === "text"){
          document.getElementById("show_password_register1").style.display = "none"
          document.getElementById("hide_password_register1").style.display = "block"
      }    
  }
  else{
      if(document.getElementById('add_register_password1').type === "password"){
          document.getElementById("show_password_register1").style.display = "block";
          document.getElementById("hide_password_register1").style.display = "none";
      }     
  }
}

//Showing the password
function show_password(){
    document.getElementById('add_register_password').type = 'text';
    document.getElementById("show_password_register").style.display = "none"
    document.getElementById("hide_password_register").style.display = "block"
}
//Hiding the password
function hide_password(){
    document.getElementById('add_register_password').type = 'password';
    document.getElementById("show_password_register").style.display = "block";
    document.getElementById("hide_password_register").style.display = "none";
}
//Showing the password
function show_password1(){
  document.getElementById('add_register_password1').type = 'text';
  document.getElementById("show_password_register1").style.display = "none"
  document.getElementById("hide_password_register1").style.display = "block"
}
//Hiding the password
function hide_password1(){
  document.getElementById('add_register_password1').type = 'password';
  document.getElementById("show_password_register1").style.display = "block";
  document.getElementById("hide_password_register1").style.display = "none";
}


//Close Login Modal
function close_login_modal(){
    document.getElementById("Register_Modal_Container").style.display = "none";

    document.getElementById("add_register_email").value = "";
    document.getElementById("add_register_fname").value = "";
    document.getElementById("add_register_lname").value = "";
    document.getElementById("add_register_password").value = "";
    document.getElementById("add_register_password1").value = "";  
    document.getElementById("span_email_register").textContent = "*";
    document.getElementsByClassName("register_password_validation")[0].textContent = "*";
    document.getElementsByClassName("register_password_validation")[1].textContent = "*";
    document.getElementById("add_register_email").style.border = "2px solid #b9c5d2";

    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
    document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
    document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";
}


//Show Login Modal
function Show_login_modal(){
  document.getElementById("Register_Modal_Container").style.display = "none";
  document.getElementById("Login_Modal_Container").style.display = "flex";
  document.getElementById("email_input").value = localStorage.getItem("email_input");
  document.getElementById("password_input").value = localStorage.getItem("password_input");

  document.getElementById("add_register_email").value = "";
  document.getElementById("add_register_fname").value = "";
  document.getElementById("add_register_lname").value = "";
  document.getElementById("add_register_password").value = "";
  document.getElementById("add_register_password1").value = "";  
  document.getElementById("span_email_register").textContent = "*";
  document.getElementsByClassName("register_password_validation")[0].textContent = "*";
  document.getElementsByClassName("register_password_validation")[1].textContent = "*";
  document.getElementById("add_register_email").style.border = "2px solid transparent";

  document.getElementById("email_input").value = "";
  document.getElementById("password_input").value = "";

  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
  document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
  document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";
}


//To validate email
function email_validation(){
  if (validator.isEmail(document.getElementById("add_register_email").value)) { //If email is valid
    document.getElementById("add_register_email").style.border = "2px solid transparent";
    document.getElementById("span_email_register").textContent = "*";
  } 
  else if(document.getElementById("add_register_email").value === "" ){  //If email value is empty
    document.getElementById("add_register_email").style.border = "2px solid transparent";
    document.getElementById("span_email_register").textContent = "*";
  }
  else { //If email is invalid
     document.getElementById("add_register_email").style.border = "2px solid red";
     document.getElementById("span_email_register").textContent = "* Invalid email";
  }
}
function password_validator(){
  var new_password = document.getElementById('add_register_password').value;
  if(new_password.length < 8 && new_password.length >= 1){
      document.getElementsByClassName("register_password_validation")[0].textContent = "* Atleast 8 characters long";
  }
  else if(new_password.length === 0){
      document.getElementsByClassName("register_password_validation")[0].textContent = "*";
  }
  else{
      document.getElementsByClassName("register_password_validation")[0].textContent = "*";
  }
}
function password_isMatch(){
  var new_password = document.getElementById('add_register_password').value;
  var confirm_password = document.getElementById('add_register_password1').value;
  if(new_password !== confirm_password && confirm_password.length !== 0){
      document.getElementsByClassName("register_password_validation")[1].textContent = "* Password doesn't match";
  }
  else{
      document.getElementsByClassName("register_password_validation")[1].textContent = "*";
  }
}

  //Add Patient Form
  const getCode=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      email: document.getElementById("add_register_email").value,
      fname: document.getElementById("add_register_fname").value,
      lname: document.getElementById("add_register_lname").value,
    }

    if(document.getElementById("span_email_register").textContent === "* Invalid email"){
        document.getElementById("image_validator_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("image_validator_container").style.left = "-100%";
        }, 2000);
    }
    else if(document.getElementsByClassName("register_password_validation")[0].textContent === "* Atleast 8 characters long"){
        document.getElementById("image_validator_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("image_validator_container").style.left = "-100%";
        }, 2000);
    }
    else if(document.getElementsByClassName("register_password_validation")[1].textContent === "* Password doesn't match"){
        document.getElementById("image_validator_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("image_validator_container").style.left = "-100%";
        }, 2000);
    }
    else{
     document.getElementsByClassName("text_btn_register1")[0].style.display = "none";
     document.getElementsByClassName("progress_btn_register1")[0].style.display = "flex";
     axios.post(localStorage.getItem("url_hosting")+"Register_Verification.php",sendData).then((result)=>{
         if(result.data.status === "Success"){
            document.getElementById("step2").style.display = "flex";
            document.getElementById("step1").style.display = "none";
            //Axios for mailer
            axios.post(localStorage.getItem("url_hosting")+'Register_Verification_Mailer.php',sendData).then((result)=>{})
         }
         else if(result.data.status === "Email taken"){
            document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
            document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";

            document.getElementById("add_register_email").style.border = "2px solid red";
            document.getElementById("span_email_register").textContent = "* Email already taken";
            document.getElementById("image_validator_container").style.left = "75px";
            setTimeout(function () {
              document.getElementById("image_validator_container").style.left = "-100%";
            }, 2000);
         }
     })//End of axios
    }
  }


  //Add Patient Form
  const resendCode=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      email: document.getElementById("add_register_email").value,
      fname: document.getElementById("add_register_fname").value,
      lname: document.getElementById("add_register_lname").value,
    }
    document.getElementsByClassName("text_btn_registerDone1")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_registerDone1")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+"Register_Verification.php",sendData).then((result)=>{
      if(result.data.status === "Success"){
        document.getElementsByClassName("text_btn_registerDone1")[0].style.display = "flex";
        document.getElementsByClassName("progress_btn_registerDone1")[0].style.display = "none";
        //Axios for mailer
        axios.post(localStorage.getItem("url_hosting")+'Register_Verification_Resend_Mailer.php',sendData).then((result)=>{})
      }
    })//End of axios
    }
  


  const submitFormRegister=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
      email: document.getElementById("add_register_email").value,
      fname: document.getElementById("add_register_fname").value,
      lname: document.getElementById("add_register_lname").value,
      password: document.getElementById("add_register_password").value,
      code: document.getElementById("code_register").value,
    }
    document.getElementsByClassName("text_btn_registerDone")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_registerDone")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+'Register_Patient.php',sendData)
    .then((result)=>{
        if(result.data.status === "Success"){           
           document.getElementById("registered_successfully").style.display = "flex";
           document.getElementsByClassName("text_btn_registerDone")[0].style.display = "flex";
           document.getElementsByClassName("progress_btn_registerDone")[0].style.display = "none";  
        }
        else if(result.data.status === "Invalid"){ 
           document.getElementsByClassName("text_btn_registerDone")[0].style.display = "flex";
           document.getElementsByClassName("progress_btn_registerDone")[0].style.display = "none";
           alert("invalid")
        }

    })    
}

function close_success_register(){
  document.getElementById("Register_Modal_Container").style.display = "none";
  document.getElementById("registered_successfully").style.display = "none";
  document.getElementById("add_register_email").value = "";
  document.getElementById("add_register_fname").value = "";
  document.getElementById("add_register_lname").value = "";
  document.getElementById("add_register_password").value = "";
  document.getElementById("add_register_password1").value = "";  
  document.getElementById("span_email_register").textContent = "*";
  document.getElementsByClassName("register_password_validation")[0].textContent = "*";
  document.getElementsByClassName("register_password_validation")[1].textContent = "*";
  document.getElementById("add_register_email").style.border = "2px solid transparent";

  document.getElementById("email_input").value = "";
  document.getElementById("password_input").value = "";

  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
  document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
  document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";
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

           
            <div id="step1">
            <form onSubmit={getCode}>
              <div className="input_register">
                <div className="input_box">
                  <p className="label">First Name <span style={{color:"red"}}>*</span></p>
                  <input type="text" placeholder="First name here" required id="add_register_fname"/>
                </div>

                <div className="input_box">
                  <p className="label">Last Name <span style={{color:"red"}}>*</span></p>
                  <input type="text" placeholder="Last name here" required id="add_register_lname"/>
                </div>
              </div>

              <div className="input_register" style={{flexDirection:"column",marginBottom:"20px"}}>
                <p id="label">Email <span style={{color:"red"}} id="span_email_register">*</span></p>
                <input type="email" placeholder="Email here" id="add_register_email" required onKeyUp={email_validation}/>
              </div>
            
              <div className="input_register" style={{flexDirection:"column",marginBottom:"20px"}}>
                  <p id="label">Password <span style={{color:"red"}} className="register_password_validation">*</span></p>
      
                  <div className="password_input_container">
                    <input type="password" 
                        placeholder="Password here" 
                        className="password_input_register"
                        id="add_register_password"
                        onKeyUp={show_password_toggle}
                        onChange={password_validator}
                        required
                    />
                    <div className="toggle_password_container">
                        <img src={Show_Password} id="show_password_register" onClick={show_password} alt="" title="Show Password"/>
                        <img src={Hide_Password} id="hide_password_register" onClick={hide_password} alt="" title="Hide Password"/>
                    </div>
                </div>
              </div>  

              <div className="input_register" style={{flexDirection:"column",marginBottom:"20px"}}>
                <p id="label">Confirm Password <span style={{color:"red"}} className="register_password_validation">*</span></p>

                <div className="password_input_container">
                    <input type="password" 
                        placeholder="Confirm password here" 
                        className="password_input_register"
                        id="add_register_password1"
                        onKeyUp={show_password_toggle1}
                        onChange={password_isMatch}
                        required
                    />
                    <div className="toggle_password_container">
                        <img src={Show_Password} id="show_password_register1" onClick={show_password1} alt="" title="Show Password"/>
                        <img src={Hide_Password} id="hide_password_register1" onClick={hide_password1} alt="" title="Hide Password"/>
                    </div>
                  </div>
              </div>
            
              <div className="signIn_btn">
                <button type="submit">
                  <CircularProgress color="inherit" id="progress_btn" className="progress_btn_register1" style={{color:"white",margin:"0"}}/>
                  <div className="text_btn_register1">Proceed</div>        
                </button>
              </div>
            </form>
            </div>

            <div id="step2" style={{display:"none"}}>
                <form>
                <h2>Verify Your Email</h2>
                <p>We emailed you the six character code to <b>khrlsmsn1110@gmail.com</b>. Enter the code below to confirm your email address.</p>

                <center>
                <input type="text" maxLength = "6" placeholder="Ex. 10e5F9" id="code_register"/>
                </center>
                <div className="signIn_btn">
                  <button type="submit" onClick={resendCode}>       
                    <CircularProgress color="inherit" id="progress_btn" className="progress_btn_registerDone1" style={{color:"white",margin:"0"}}/>
                    <div className="text_btn_registerDone1">Resend Code</div>   
                  </button>
                  <button type="submit" onClick={submitFormRegister}>
                    <CircularProgress color="inherit" id="progress_btn" className="progress_btn_registerDone" style={{color:"white",margin:"0"}}/>
                    <div className="text_btn_registerDone">Submit</div>        
                  </button>
                </div>
                </form>
            </div>
            
          </div>

        </div>
    </div>

    {/*Validator slide modal */}
    <ValidatorSlideModal
      validatorText = "You have an error in your form"
    />

    {/*Success add vaccine modal */}
    <div className="success_addPatient_modal" id="registered_successfully">
        <div className="success_patient_container">
            <img src={Done_Icon} alt=""/>
            <p className="head_text">Successful!</p>
            <p>You have successfully registered your account.</p>
            <button onClick={close_success_register}>Close</button>
        </div>
    </div>

  </div>
)
}

