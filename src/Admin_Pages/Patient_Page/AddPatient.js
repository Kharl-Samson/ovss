import React ,{ Children, useEffect, useState } from "react";
import "./Patient.css";
import axios from "axios";
import Admin_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorSlideImage from "../../Modals/ImageErrorSlideModal";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Upload_Icon from "./Images/Upload_Icon.png";
import { v4 as uuidv4 } from "uuid";
import validator from 'validator';
import ValidatorSlideModal from "../../Modals/ValidatorSlideModal";
import moment from 'moment';
import Patient_Icon from "./Images/Patient_Icon.png";

export default function AddPatientPage(){
  let navigate = useNavigate();
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
document.title = "OVSS | Add Patient";
    
//Setting the color of active navigation text
setTimeout(function () {
    document.getElementById("link_add_patient").style.pointerEvents="none";
    document.getElementById("admin_Add_Patient_link").style.backgroundColor = "#e7e7ff";
    document.getElementById("left_nav_Add_Patient_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("left_nav_patient_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_patient_link").style.backgroundColor = "#e7e7ff";
}, 10);

//Showing cancel when the image is hover
function hover_image(){
    var x = document.getElementById("patient_add_img");
    if(window.getComputedStyle(x).display !== "none"){
      document.getElementsByClassName("cancel_btn")[0].style.display="flex";
    }
    else{
      document.getElementsByClassName("cancel_btn")[0].style.display="none";
    }
  }
  //On mouse out image hover
  function out_hover_image(){
    document.getElementsByClassName("cancel_btn")[0].style.display="none";
  }
  //Click cancel in image hover
  function cancel_image(){
    document.getElementsByClassName("notes")[0].style.display = "block";
    document.getElementById("upload_photo_btn").style.display = "block";
    document.getElementById("upload_img_icon").style.display = "block";
    document.getElementsByClassName("cancel_btn")[0].style.display="none";
    document.getElementById("patient_add_img").style.display = "none";
    document.getElementById("image_file").value = null;
    document.getElementById("image_input").value = "";
  }
  //Clicking upload photo in edit medicine
  function selectFile(){
    document.getElementById('image_file').click();
  }
  /* eslint no-restricted-globals:0 */
  function loadfile(event){
    if(document.getElementById("image_file").files[0].size > 5242880){//If file size is bigger than 5mb
      document.getElementById("image_istoobig_container").style.left = "75px";
      setTimeout(function () {
        document.getElementById("image_istoobig_container").style.left = "-100%";
      }, 2000);
      document.getElementById("image_file").value = null;
      document.getElementById("image_input").value = "";
    }
    else{
      document.getElementById("image_input").value = document.getElementById("image_file").files[0].name;
      var output=document.getElementById("patient_add_img");
      output.src=URL.createObjectURL(event.target.files[0]);
      document.getElementsByClassName("cancel_btn")[0].style.display="none";
      document.getElementById("upload_img_icon").style.display = "none";
      document.getElementById("patient_add_img").style.display = "block";
      document.getElementsByClassName("notes")[0].style.display = "none";
      document.getElementById("upload_photo_btn").style.display = "none";
    }
  };

  //Add Children Entry
  var i = 0;
  const [childrenEntry, setChildrenEntry] = useState([{ id: uuidv4() }]);
  const handleAddChildrenEntry = () => {
    setChildrenEntry([...childrenEntry, { id: uuidv4() }]);
  };
  const handleRemoveChidrenEntry = (id) => {
    const values = [...childrenEntry];
    values.splice(
    values.findIndex((value) => value.id === id),
    1
    );
    setChildrenEntry(values);
 };
  

 //Getting the data of all child
 function getAllChildData(){
    var fname_Str = "", mname_Str = "", lname_Str = "", gender_Str = "", weight_Str = "", place_Str = "", cbday_Str = "", cage_Str = "";
    var fname = document.getElementsByClassName("add_patient_Cfname");
    var mname = document.getElementsByClassName("add_patient_Cmname");
    var lname = document.getElementsByClassName("add_patient_Clname");
    var gender = document.getElementsByClassName("add_patient_Cgender");
    var weight = document.getElementsByClassName("add_patient_Cweight");
    var place = document.getElementsByClassName("add_patient_Cplace");
    var cbday = document.getElementsByClassName("cbday");
    var cage = document.getElementsByClassName("cage");
    for(var i = 0 ; i < fname.length ; i++){
        fname_Str += fname[i].value + " || ";
        mname_Str += mname[i].value + " || ";
        lname_Str += lname[i].value + " || ";
        gender_Str += gender[i].value + " || ";
        weight_Str += weight[i].value + " || ";
        place_Str += place[i].value + " || ";
        cbday_Str += cbday[i].value + " || ";
        cage_Str += cage[i].value + " || ";
    }
    document.getElementById("fname_collection").value = fname_Str;
    document.getElementById("mname_collection").value = mname_Str;
    document.getElementById("lname_collection").value = lname_Str;
    document.getElementById("gender_collection").value = gender_Str;
    document.getElementById("weight_collection").value = weight_Str;
    document.getElementById("place_collection").value = place_Str;
    document.getElementById("bday_collection").value = cbday_Str;
    document.getElementById("age_collection").value = cage_Str;
 }

//To validate email
function email_validation(){
    if (validator.isEmail(document.getElementById("add_patient_email").value)) { //If email is valid
      document.getElementById("add_patient_email").style.border = "2px solid #b9c5d2";
      document.getElementById("span_email").textContent = "*";
    } 
    else if(document.getElementById("add_patient_email").value === "" ){  //If email value is empty
      document.getElementById("add_patient_email").style.border = "2px solid #b9c5d2";
      document.getElementById("span_email").textContent = "*";
    }
    else { //If email is invalid
       document.getElementById("add_patient_email").style.border = "2px solid red";
       document.getElementById("span_email").textContent = "* Invalid email";
    }
}
//Validate Phone number
function phonenumber() {
 var phone = document.getElementById("add_patient_contact").value;
 var phoneno = /^(09|\+639)\d{9}$/;
 if (phone.length !== 0 && phone.length !== 11) {
    document.getElementById("add_patient_contact").style.border = "2px solid red";
    document.getElementById("span_contact").textContent = "* Invalid number";
 } else if (phone.length === 0) {
    document.getElementById("add_patient_contact").style.border = "2px solid #b9c5d2";
    document.getElementById("span_contact").textContent = "*";
 } else if (!phone.match(phoneno)) {
    document.getElementById("add_patient_contact").style.border = "2px solid red";
    document.getElementById("span_contact").textContent = "* Invalid number";
 } else {
    document.getElementById("add_patient_contact").style.border = "2px solid #b9c5d2";
    document.getElementById("span_contact").textContent = "*";
 }
}

  //Add Patient Form
  const addPatientForm=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      image: document.getElementById("image_input").value,
      fname: document.getElementById("add_patient_fname").value,
      mname: document.getElementById("add_patient_mname").value,
      lname: document.getElementById("add_patient_lname").value,
      email: document.getElementById("add_patient_email").value,
      prov: document.getElementById("add_patient_prov").value,
      city: document.getElementById("add_patient_city").value,
      bar: document.getElementById("add_patient_bar").value,
      purok: document.getElementById("add_patient_purok").value,
      contact: document.getElementById("add_patient_contact").value,
      cfname: document.getElementById("fname_collection").value,
      cmname: document.getElementById("mname_collection").value,
      clname: document.getElementById("lname_collection").value,
      cgender: document.getElementById("gender_collection").value,
      cweight: document.getElementById("weight_collection").value,
      cplace: document.getElementById("place_collection").value,
      password: document.getElementById("add_patient_fname").value+moment().format('L'),
      bday: document.getElementById("add_patient_birthday").value,
      age: document.getElementById("add_patient_age").value,
      cbday: document.getElementById("bday_collection").value,
      cage: document.getElementById("age_collection").value,
    }

    if(document.getElementById("span_email").textContent === "* Invalid email"){
        document.getElementById("image_validator_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("image_validator_container").style.left = "-100%";
        }, 2000);
    }
    else if(document.getElementById("span_contact").textContent === "* Invalid number"){
        document.getElementById("image_validator_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("image_validator_container").style.left = "-100%";
        }, 2000);
    }
    else{
     document.getElementsByClassName("text_btn_add_Patient")[0].style.display = "none";
     document.getElementsByClassName("progress_btn_add_Patient")[0].style.display = "flex";
     axios.post(localStorage.getItem("url_hosting")+"Add_Patient.php",sendData).then((result)=>{
         if(result.data.status === "Success"){
            document.getElementsByClassName("success_addPatient_modal")[0].style.display = "flex";
            //Axios for mailer
            axios.post(localStorage.getItem("url_hosting")+'Add_Patient_Mailer.php',sendData).then((result)=>{})
         }
         else if(result.data.status === "Email taken"){
            document.getElementsByClassName("text_btn_add_Patient")[0].style.display = "flex";
            document.getElementsByClassName("progress_btn_add_Patient")[0].style.display = "none";
            document.getElementById("add_patient_email").style.border = "2px solid red";
            document.getElementById("span_email").textContent = "* Email already taken";
            document.getElementById("image_validator_container").style.left = "75px";
            setTimeout(function () {
              document.getElementById("image_validator_container").style.left = "-100%";
            }, 2000);
         }
     })//End of axios
     //Axios uploading photo
     for (let i = 0; i < document.getElementsByName("img_patient[]").length; i++) {
         data.append("file[]", document.getElementsByName("img_patient[]")[i].files[0]);
        }
     let url = localStorage.getItem("url_hosting")+"Add_Patient.php";
     axios.post(url, data, {}).then((res) => {});
    }
  }

//Function click okay in success modal
function okay_success_modal(){
  navigate(`/Administration_View_Patient`);
}

//Getting users age in input
function getAge() {
  var bdate_input = document.getElementById("add_patient_birthday").value;
  var dob = new Date(bdate_input);
  var month_diff = Date.now() - dob.getTime(); //calculate month difference from current date in time
  var age_dt = new Date(month_diff); //convert the calculated difference in date format
  var year = age_dt.getUTCFullYear(); //extract year from date
  var age = Math.abs(year - 1970); //now calculate the age of the user
  document.getElementById("add_patient_age").value = age;
  getAllChildData();
}

var today = moment().format("L");
today = today.split("/");
var maxDateInput = today[2] + "-" + today[0] + "-" + today[1];


function getDaysChild(key){
  const date1 = new Date(document.getElementsByClassName("cbday")[key].value);
  const date2 = new Date(maxDateInput);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));    
  document.getElementsByClassName("cage")[key].value=diffDays;
  getAllChildData();
}

return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Add <span style={{color:"#4D77FF"}}>Patient</span></h1>

           <div className="add_patient_container">
           <form onSubmit={addPatientForm}>
              <div className="top">

                <div div className="image_container" onMouseOver={hover_image} onMouseOut={out_hover_image}>
                    <img alt="" src={Upload_Icon} style={{height:"35px",witdth:"35px"}} id="upload_img_icon"/>
                    <p id="upload_photo_btn" onClick={selectFile}>Upload profile image</p>
                    <div className="notes">
                      <p>* This is optional</p>
                      <p>* png or jpg only</p>
                      <p>* up to 5mb</p>
                      <p>* No whitespaces in file name</p>
                      <p>(ex. my_photo.png)</p>
                    </div>
                    <img alt="" src="" id="patient_add_img"/>

                    <div className="cancel_btn">
                      <div onClick={cancel_image}>
                        <CancelIcon style={{marginRight:"5px"}}/>
                        Cancel
                      </div>
                    </div>
                </div>

                <input type="file" id="image_file" name="img_patient[]" accept="image/png, image/jpeg" onChange={() => { loadfile(event);}} style={{display:"none"}} />
                <input type="hidden" id="image_input"/>

                <div className="right">
                    <label className="label">First Name <span style={{color:"red"}}>*</span></label>
                    <input type="text" placeholder="First name here" className="input_top" id="add_patient_fname" required/>

                    <label className="label" style={{marginTop:"20px"}}>Middle Name</label>
                    <input type="text" placeholder="This is optional" className="input_top" id="add_patient_mname"/>

                    <label className="label" style={{marginTop:"20px"}}>Last Name <span style={{color:"red"}}>*</span></label>
                    <input type="text" placeholder="Last name here" className="input_top" id="add_patient_lname" required/>
                  </div>

              </div>

              <div style={{display:"flex",flexDirection:"column"}}>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                    <label className="label">Email <span style={{color:"red"}} id="span_email">*</span></label>
                    <input type="text" placeholder="Email here" id="add_patient_email" className="input_top" required onChange={email_validation}/>
                  </div>
                  <div className="box">
                    <label className="label">Contact # <span style={{color:"red"}} id="span_contact">*</span></label>
                    <input type="number" placeholder="Ex. 09196712224" id="add_patient_contact" className="input_top" required onChange={phonenumber}/>
                  </div>
                </div>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                    <label className="label">Birthday <span style={{color:"red"}} id="span_email">*</span></label>
                    <input type="date" id="add_patient_birthday" className="input_top" 
                    required onChange={getAge} max={maxDateInput}/>
                  </div> 
                  <div className="box">
                    <label className="label">Age <span style={{color:"red"}} id="span_contact">*</span></label>
                    <input type="number" placeholder="0" id="add_patient_age" className="input_top" 
                    style={{backgroundColor:"#EBEBEB"}} readOnly/>
                  </div>
                </div>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                    <label className="label">Purok <span style={{color:"red"}}>*</span></label>        
                    <select
                      name="purok[]"
                      id="add_patient_purok"
                      required
                    >
                    <option disabled selected value="">-Select Purok-</option>
                    {purok_object &&
                      purok_object.length > 0 &&
                      purok_object.map((item) =>
                        <option key={item.label} value={item.label}>
                            {item.label}
                        </option>
                    )}
                    </select>
                  </div>
                  <div className="box">
                    <label className="label">Barangay <span style={{color:"red"}}>*</span></label>
                    <input type="text" placeholder="Barangay here" value="Pinagbarilan" id="add_patient_bar" 
                     className="input_top" readOnly style={{backgroundColor:"#EBEBEB"}}
                    />
                  </div>
                </div>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                     <label className="label">Municipality <span style={{color:"red"}}>*</span></label>
                    <input type="text" placeholder="Municipality here" value="Baliuag" id="add_patient_city" 
                     className="input_top" readOnly style={{backgroundColor:"#EBEBEB"}}
                    />
                  </div>
                  <div className="box">
                    <label className="label">Province <span style={{color:"red"}}>*</span></label>
                    <input type="text" placeholder="Province here" value="Bulacan" id="add_patient_prov" 
                     className="input_top" readOnly style={{backgroundColor:"#EBEBEB"}}
                    />
                  </div>

                </div>

                <h1>Child <span style={{color:"#4D77FF"}}>Information</span></h1>


                {childrenEntry.map((index) => (
                <div key={i++} style={{paddingBottom:"20px",borderBottom:"2px solid #4D77FF",marginBottom:"20px"}}>
                  <p style={{fontSize:"1rem",fontWeight:"800",color:"#4D77FF"}}>Child No. {i+1}</p>

                  <div className="flex_bot" style={{marginTop:"20px"}}>
                    <div className="box">
                        <label className="label">First Name <span style={{color:"red"}}>*</span></label>
                        <input type="text" placeholder="First name here" id="add_patient_Cfname"
                        className="input_top add_patient_Cfname" required onChange={getAllChildData}/>
                    </div>
                    <div className="box">
                        <label className="label">Middle Name</label>
                        <input type="text" placeholder="This is optional" id="add_patient_Cmname" className="input_top add_patient_Cmname" required onChange={getAllChildData}/>
                    </div>
                  </div>

                  <div className="flex_bot" style={{marginTop:"20px"}}>
                    <div className="box">
                        <label className="label">Last Name <span style={{color:"red"}}>*</span></label>
                        <input type="text" placeholder="Last name here" id="add_patient_Clname" className="input_top add_patient_Clname" required onChange={getAllChildData}/>
                    </div>
                    <div className="box">
                        <label className="label">Sex <span style={{color:"red"}}>*</span></label>
                        <select
                          name="purok[]"
                          className="input_top add_patient_Cgender"
                          onChange={getAllChildData}
                          required
                        >
                            <option disabled selected value="">-Select Gender-</option>
                            {gender_object &&
                              gender_object.length > 0 &&
                              gender_object.map((item) =>
                              <option key={item.label} value={item.label}>
                                  {item.label}
                              </option>
                            )}
                        </select>
                    </div>
                  </div>

                  <div className="flex_bot" style={{marginTop:"20px"}}>
                    <div className="box">
                      <label className="label">Birthday <span style={{color:"red"}} id="span_email">*</span></label>
                      <input type="date" id="add_Cpatient_birthday" className="input_top cbday" 
                      required
                      onChange={() => { getDaysChild(i-1);}} 
                      max={maxDateInput}/>
                    </div> 
                    <div className="box">
                      <label className="label">Days old <span style={{color:"red"}} id="span_contact">*</span></label>
                      <input type="text" placeholder="0" id="add_Cpatient_age" className="input_top cage" 
                      style={{backgroundColor:"#EBEBEB"}} readOnly/>
                    </div>
                  </div>

                  <div className="flex_bot" style={{marginTop:"20px"}}>
                    <div className="box">
                        <label className="label">Weight <span style={{color:"red"}}>*</span></label>
                        <input type="number" placeholder="Weight here" id="add_patient_Cweight" className="input_top add_patient_Cweight" required onChange={getAllChildData}/>
                    </div>
                    <div className="box">
                        <label className="label">Place of Birth <span style={{color:"red"}}>*</span></label>
                        <input type="text" placeholder="Place of birth here" id="add_patient_Cplace" className="input_top add_patient_Cplace" required onChange={getAllChildData}/>
                    </div>
                  </div>

                </div>
                ))}

                <div className="entry_button">
                  <button
                    type="button"
                    disabled={childrenEntry.length === 1}
                    onClick={() => handleRemoveChidrenEntry(childrenEntry.id)}
                  >
                    Remove
                  </button>
                  <button type="button" onClick={handleAddChildrenEntry}>
                    Add another entry
                  </button>
                </div>

                <input type="hidden" id="fname_collection"/>
                <input type="hidden" id="mname_collection"/>
                <input type="hidden" id="lname_collection"/>
                <input type="hidden" id="gender_collection"/>
                <input type="hidden" id="weight_collection"/>
                <input type="hidden" id="place_collection"/>     
                <input type="hidden" id="bday_collection"/>
                <input type="hidden" id="age_collection"/>


                <div className="button_submit">
                    <button type="submit" onMouseOver={getAllChildData}>
                        <CircularProgress color="inherit" id="progress_btn" className="progress_btn_add_Patient" />
                        <span className="text_btn_add_Patient">Save</span>
                    </button>
                </div>
              </div>

           </form> 
           </div>

        </div>
      </div>
      <Admin_Right_Navigation_Bar/>
    </div>

    {/*Error if the image is too big modal */}
    <ErrorSlideImage/>
    {/*Validator slide modal */}
    <ValidatorSlideModal
        validatorText = "You have an error in your form"
    />

    {/*Success add vaccine modal */}
    <div className="success_addPatient_modal">
        <div className="success_patient_container">
            <img src={Patient_Icon} alt=""/>
            <p className="head_text">Successful!</p>
            <p>You have successfully added a new patients.</p>
            <button onClick={okay_success_modal}>Okay</button>
        </div>
    </div>

 
  </div>
)
}


//List of purok
const purok_object = [
    { label: "Bagong Silang" },
    { label: "Camia" },
    { label: "Masagana" },
    { label: "Pagala" },
    { label: "Pinagpala" },
  ];

//List of gender
const gender_object = [
    { label: "Male" },
    { label: "Female" },
  ];