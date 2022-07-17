import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Scheduling.css";
import moment from 'moment';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Patient_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Patient_Right_Navigation_Bar from "../Navigation_Bar/Right_Nav";
import child_select from "./Images/child_select.png";

import { DatePicker } from "react-rainbow-components";
import EachVaccine from './EachVaccine';
import { useNavigate } from "react-router-dom";
import Done_Icon from "../../Assets/Icons/Done_Icon.png";

export default function Schedule_Page(){
  let navigate = useNavigate();
  //Navigate to view patient
  function gotoViewSchedule(){
    navigate(`/View_Schedule`);
  }

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Schedule";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_Schedule").style.pointerEvents="none";
    document.getElementById("left_nav_schedule_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_Schedule_link").style.backgroundColor = "#e7e7ff";
  }, 10);

  //If the width of screen is below 850px -> It will hide the profile notifyer
  const mq = window.matchMedia("(max-width: 850px)");
  if (mq.matches) {}
  else{
    setTimeout(function(){
        if(localStorage.getItem('patient_account_status') !=="Pending"){
            document.getElementById("profile_notify_container").style.display="none"
        }
        else{
            document.getElementById("profile_notify_container").style.display="flex";
        }
    },1000);
  }

  //Date picker hooks
  const [date, setDate] = useState(null);
  function onChange(date) {
    if(moment(date).day() === 0 || moment(date).day() === 6)
    {
      document.getElementById("date_picker").style.border = "2px solid red";
      document.getElementById("date_picker").style.borderRadius = "8px";
      document.getElementById("date_picker_validation").textContent = "* Not available during weekends";
    }
    else{
      document.getElementById("date_picker").style.border = "none";
      document.getElementById("date_picker_validation").textContent = "*";
      var pick_date = moment(date).format('L');
      const array_date = pick_date.split("/");
      var newDate = array_date[2]+"-"+array_date[0]+"-"+array_date[1];
      document.getElementById("appt_date").value = newDate;
      setDate(date);
    }
  }


   //Profile key
   var key_profile = localStorage.getItem("patient_login_email");
   //Loading while fetching data in axios
   const [loading,setLoading] = useState(false);
   //Hook for view the list of patients
   const [patients, setPatients] = useState([]);  

   //Array child
   const [fnameChild, setfnameChild] = useState([]);  
   const [mnameChild, setmnameChild] = useState([]);  
   const [lnameChild, setlnameChild] = useState([]);  
   const [sexChild, setsexChild] = useState([]);  
   const [weightChild, setweightChild] = useState([]);  
   const [placeChild, setplaceChild] = useState([]);  
   const [bdayChild, setbdayChild] = useState([]);  
   const [ageChild, setageChild] = useState([]);  
   const loadPatients = async () =>{
     const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Patients.php");
     setLoading(true);
     setPatients(result.data.phpresult);
   };


   useEffect(() => {
     loadPatients();
     setTimeout(function () {
        var array_Cfname = document.getElementById("child_fname").value.slice(0, -4).split(" || ");
        var array_Cmname = document.getElementById("child_mname").value.slice(0, -4).split(" || ");
        var array_Clname = document.getElementById("child_lname").value.slice(0, -4).split(" || ");
        var array_Csex = document.getElementById("child_sex").value.slice(0, -4).split(" || ");
        var array_Cweight = document.getElementById("child_weight").value.slice(0, -4).split(" || ");
        var array_Cplace = document.getElementById("child_place").value.slice(0, -4).split(" || ");
        var array_Cbday = document.getElementById("child_bday").value.slice(0, -4).split(" || ");
        var array_Cage = document.getElementById("child_age").value.slice(0, -4).split(" || ");
        setfnameChild(array_Cfname);
        setmnameChild(array_Cmname);
        setlnameChild(array_Clname);
        setsexChild(array_Csex);
        setweightChild(array_Cweight);
        setplaceChild(array_Cplace);
        setbdayChild(array_Cbday);
        setageChild(array_Cage);
      }, 1000);
   }, []);

   var array_patient_ctr = 0;
   const Mother_Information = patients.map((res) => {
    array_patient_ctr++;
    if(key_profile === res.email)
    return (
    <div key={array_patient_ctr} style={{display:"none"}}>
        <input type="hidden" value={res.email} id="mother_email"/>
        <input type="hidden" value={res.id} id="mother_id"/>
        <input type="hidden" value={res.fname} id="mother_fname"/>
        <input type="hidden" value={res.mname} id="mother_mname"/>
        <input type="hidden" value={res.lname} id="mother_lname"/>
        <input type="hidden" value={res.purok} id="mother_purok"/>
        <input type="hidden" value={res.barangay} id="mother_barangay"/>
        <input type="hidden" value={res.municipality} id="mother_municipality"/>
        <input type="hidden" value={res.province} id="mother_province"/>
        <input type="hidden" value={res.contact} id="mother_contact"/>
        <input type="hidden" value={res.child_fname} id="child_fname"/>
        <input type="hidden" value={res.child_mname} id="child_mname"/>
        <input type="hidden" value={res.child_lname} id="child_lname"/>
        <input type="hidden" value={res.child_sex} id="child_sex"/>
        <input type="hidden" value={res.child_weight} id="child_weight"/>
        <input type="hidden" value={res.child_place} id="child_place"/>
        <input type="hidden" value={res.child_bday} id="child_bday"/>
        <input type="hidden" value={res.child_age} id="child_age"/>
    </div>
    ); 
  });


  var array_child_ctr = -1;
  const Child_Info = fnameChild.map(() => {
    array_child_ctr++;
    return (
        <option 
        key={array_child_ctr}
        value=
          {
            fnameChild[array_child_ctr]+"||"+
            mnameChild[array_child_ctr]+"||"+
            lnameChild[array_child_ctr]+"||"+
            sexChild[array_child_ctr]+"||"+
            weightChild[array_child_ctr]+"||"+
            placeChild[array_child_ctr]+"||"+
            bdayChild[array_child_ctr]+"||"+
            ageChild[array_child_ctr]+"||"
          }
        >{fnameChild[array_child_ctr]+" "+lnameChild[array_child_ctr]}</option>
    ); 
  });

  function selectName(){
    document.getElementsByClassName("submit_schedule_btn")[0].style.display = "flex";
    document.getElementById("validator_request").style.display = "none";
    
    var select_val = document.getElementById("input_cname").value;
    const child_array = select_val.split("||");
    const new_child_array = child_array.slice(0, -1);
    const date1 = new Date(new_child_array[6]);
    const date2 = new Date(moment().format('L'));
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));    
    document.getElementById("child_age_key").value = diffDays;

    window.localStorage.setItem('select_Vaccine_child_age', diffDays);
    loadVaccines();
    document.getElementById("child_select_validate").style.display ="none";
    document.getElementById("list_of_vaccines").style.display ="block";


    document.getElementById("childfname").value = new_child_array[0];
    document.getElementById("childmname").value = new_child_array[1];
    document.getElementById("childlname").value = new_child_array[2];
    document.getElementById("childbdate").value = new_child_array[6];
    document.getElementById("childage").value = new_child_array[7];
    document.getElementById("childsex").value = new_child_array[3];
    document.getElementById("childweight").value = new_child_array[4];
    document.getElementById("childplace").value = new_child_array[5];
  }


   //Loading while fetching data in axios
   const [loading1,setLoading1] = useState(false);
   //Hook for view the list of vaccines
   const [vaccines, setVaccines] = useState([]);  
   const loadVaccines = async () =>{
     const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Vaccines.php");
     setLoading1(true);
     setVaccines(result.data.phpresult);
   };
   useEffect(() => {
     loadVaccines();
   }, []);
  
   var array_vaccines_ctr = 0;
   const box_vaccines = vaccines.map((res) => {
      if(parseInt(res.age) <= parseInt(localStorage.getItem("select_Vaccine_child_age"))){
        array_vaccines_ctr++;
        return (
          <EachVaccine
            key={array_vaccines_ctr}
            name = {res.name}
            image = {res.image}
          />
        ); 
      }
   });


   //Add Patient Form
  const submitScheduleForm=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      email: document.getElementById("mother_email").value,
      mother_id: document.getElementById("mother_id").value,
      mother_fname: document.getElementById("mother_fname").value,
      mother_mname: document.getElementById("mother_mname").value,
      mother_lname: document.getElementById("mother_lname").value,
      purok: document.getElementById("mother_purok").value,
      barangay: document.getElementById("mother_barangay").value,
      municipality: document.getElementById("mother_municipality").value,
      province: document.getElementById("mother_province").value,
      appointment_date: document.getElementById("appt_date").value,
      contact: document.getElementById("mother_contact").value,
      child_fname: document.getElementById("childfname").value,
      child_mname: document.getElementById("childmname").value,
      child_lname: document.getElementById("childlname").value,
      child_bdate: document.getElementById("childbdate").value,
      child_age: document.getElementById("childage").value,
      child_sex: document.getElementById("childsex").value,
      child_weight: document.getElementById("childweight").value,
      child_placeDelivery: document.getElementById("childplace").value,
      child_vaccineName: document.getElementById("vax_name").value,
    }
     if(date === null){
        document.getElementById("date_picker").style.border = "2px solid red";
        document.getElementById("date_picker").style.borderRadius = "8px";
        document.getElementById("date_picker_validation").textContent = "* Select a date";
     }
     else{
      document.getElementsByClassName("text_btn_request_sched")[0].style.display = "none";
      document.getElementsByClassName("progress_btn_request_sched")[0].style.display = "flex";
      axios.post(localStorage.getItem("url_hosting")+"Request_Scehdule.php",sendData).then((result)=>{
         if(result.data.status === "Success"){
           document.getElementsByClassName("text_btn_request_sched")[0].style.display = "flex";
           document.getElementsByClassName("progress_btn_request_sched")[0].style.display = "none";

           document.getElementsByClassName("success_make_appointment_modal")[0].style.display = "flex";
           
         }
         else if(result.data.status === "Invalid Appointment"){
          document.getElementsByClassName("text_btn_request_sched")[0].style.display = "flex";
          document.getElementsByClassName("progress_btn_request_sched")[0].style.display = "none";
          document.getElementById("validator_request").style.display = "block";
         }
         else{
          document.getElementsByClassName("text_btn_request_sched")[0].style.display = "flex";
          document.getElementsByClassName("progress_btn_request_sched")[0].style.display = "none";
           alert("SQL error")
         }
      })//End of axios
     }
  }

  
//Function click okay in success modal
function okay_success_modal(){
  navigate(`/View_Schedule`);
}


return(
<div className="admin_dashboard_container">
    <Patient_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">
                <h1>Book an <span style={{color:"#4D77FF"}}>Appointment</span></h1>

                <div className='breadcrumbs_patient_profile'>
                  <p style={{color:"#666f75"}} onClick={gotoViewSchedule}>View Schedule</p>
                  <p style={{color:"#4D77FF"}}>&#62;</p>
                  <p style={{color:"#4D77FF"}}>Schedule</p>
                </div>
              
                <form onSubmit={submitScheduleForm}>
                <div className='schedule_container'>

                   <div className='container' style={{marginBottom:"30px"}}>
                      <div className='box'>
                        <p>Appointment Date <span id="date_picker_validation" style={{color:"red",fontSize:".7rem"}}>*</span></p>   
                        <DatePicker
                           id="date_picker"
                           width="10px"
                           value={date}
                           onChange={onChange}
                           placeholder="Select a date"
                           formatStyle="large"    
                           minDate={new Date(moment())}                                      
                        />
                      </div>
                      <div className='box'>
                        <p>Vaccine  for <span style={{color:"red"}}>*</span></p>   
                        <select id="input_cname" onChange={selectName} required>
                            <option value="" disabled selected>- Select a child -</option>
                            {Child_Info}
                        </select>
                        <input type="hidden" id="child_age_key"/>
                      </div>
                   </div>  

                   {loading ?                
                    <div className='container1'>
                      <p>Suggested Vaccines <span style={{color:"red"}}>*</span></p>           
                      <div className='container' id="list_of_vaccines" style={{marginBottom:"30px",display:"none"}}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >  
                       {box_vaccines}
                      </Grid>
                      </div>
                      <div className='child_select_validate' id="child_select_validate">
                          <img alt='' src={child_select}/>
                          Select a child first to show available vaccines
                      </div>

                      {Mother_Information}
                      <input type="hidden" id="appt_date"/>
                      <input type="hidden" id="vax_name"/>
                      <input type="hidden" id="childfname"/>
                      <input type="hidden" id="childmname"/>
                      <input type="hidden" id="childlname"/>
                      <input type="hidden" id="childbdate"/>
                      <input type="hidden" id="childage"/>
                      <input type="hidden" id="childsex"/>
                      <input type="hidden" id="childweight"/>
                      <input type="hidden" id="childplace"/>
                      <center>
                        
                        <p id="validator_request" style={{color:"red",fontSize:".9rem",textAlign:"center",margin:"0 20px",marginBottom:"30px",lineHeight:"1",display:"none"}}>* Invalid Request. This person has already received a shot with this vaccine or has a pending appointment with us with the same vaccine.</p>
                        <button className='submit_schedule_btn' type="submit">
                          <CircularProgress color="inherit" id="progress_btn" className="progress_btn_request_sched"/>
                          <span className="text_btn_request_sched">Submit</span>
                        </button>
                      </center>

                    </div>
                    :
                    <div className='no_schedule_available'>
                      <CircularProgress style={{height:"60px",width:"60px"}}/>
                    </div> 
                   }
                </div>
                </form>

            </div>
        </div>
            
        <Patient_Right_Navigation_Bar/>
    </div>

    
    {/*Success add vaccine modal */}
    <div className="success_addPatient_modal success_make_appointment_modal">
        <div className="success_patient_container">
            <img src={Done_Icon} alt=""/>
            <p className="head_text">Successful!</p>
            <p>You have successfully submitted your appointment. Just wait for the email confirmation, Thank you.</p>
            <button onClick={okay_success_modal}>Okay</button>
        </div>
    </div>

</div>
)
}

