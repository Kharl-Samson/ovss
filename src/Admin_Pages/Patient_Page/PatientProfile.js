import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Patient.css";
import moment from "moment";
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import profile_cover from "./Images/profile_cover.png";
import mother_info_icon from "./Images/mother_info_icon.png";
import Admin_Left_Navigation_Bar from '../Navigation_Bar/Left_Nav';
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import CircularProgress from '@mui/material/CircularProgress';
import EachChild from './EachChild';
import { useNavigate } from "react-router-dom";

export default function Admin_PatientProfile(){
  let navigate = useNavigate();
  //Navigate to view patient
  function gotoViewPatient(){
    navigate(`/Administration_View_Patient`);
  }

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Patient Profile";
  
  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("left_nav_patient_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_patient_link").style.backgroundColor = "#e7e7ff";
  }, 10);
  

  
    //Profile key
    var key_profile = localStorage.getItem("patient_profile_key");
    var child_id = localStorage.getItem("patient_profile_id_key");

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
       }, 100);
    }, []);

    var array_child_ctr = -1;
    const Child_Info = fnameChild.map(() => {
      array_child_ctr++;
      return (
        <EachChild
          key={array_child_ctr}
          fname={fnameChild[array_child_ctr]}
          mname={mnameChild[array_child_ctr]}
          lname={lnameChild[array_child_ctr]}
          sex={sexChild[array_child_ctr]}
          weight={weightChild[array_child_ctr]}
          place={placeChild[array_child_ctr]}
          bday={bdayChild[array_child_ctr]}
          age={ageChild[array_child_ctr]}
          id={child_id+"-"+(array_child_ctr+1)}
          child_no ={array_child_ctr+1}
          classNo ={array_child_ctr}
        />
      ); 
    });



    var array_patient_ctr = 0;
    const Photo_Name_Email = patients.map((res) => {
      array_patient_ctr++;
      if(key_profile === res.email)
      return (
      <div className='name_image' key={array_patient_ctr}>
        <img alt="" 
          src={localStorage.getItem("url_account_img")+res.profile_photo}
          onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_account_img")+"default_avatar.png"}}
        />
        <div className='name_container'>
          <p>{res.fname+" "+res.lname}</p>
          <p>{res.email}</p>
        </div>
      </div>
      ); 
    });

    const Mother_Information = patients.map((res) => {
      array_patient_ctr++;
      if(key_profile === res.email)
      return (
      <div className='mother_child_info_container' key={array_patient_ctr}>
        <div className='top'>
          <img alt="" src={mother_info_icon}/>
          <p>Mother Information</p>
        </div>

        <div className='info_container'>
          <div className='a_c'>
            <p className='label'>FIRST NAME</p>
            <p className='value'>{res.fname}</p>
          </div>
          <div className='b'>
            <p className='label'>MIDDLE NAME</p>
            <p className='value'>{res.mname}</p>
          </div>
          <div className='a_c'>
            <p className='label'>LAST NAME</p>
            <p className='value'>{res.lname}</p>
          </div>
        </div>

        <div className='info_container'>
          <div className='a_c'>
            <p className='label'>MOTHER ID</p>
            <p className='value'>{"OVSS-"+res.id }</p>
          </div>
          <div className='b'>
            <p className='label'>EMAIL ADDRESS</p>
            <p className='value' style={{textTransform:"none"}}>{res.email}</p>
          </div>
          <div className='a_c'>
            <p className='label'>CONTACT NO.</p>
            <p className='value'>{res.contact}</p>
          </div>
        </div>

        <div className='info_container'>
          <div className='a_c'>
            <p className='label'>BIRTHDAY</p>
            <p className='value'>{moment(res.bday).format('LL')}</p>
          </div>
          <div className='b'>
            <p className='label'>Age</p>
            <p className='value'>{res.age}</p>
          </div>
          <div className='a_c'>
            <p className='label'>PUROK</p>
            <p className='value'>{res.purok}</p>
          </div>
        </div>

        <div className='info_container'>
          <div className='a_c'>
            <p className='label'>BARANGAY</p>
            <p className='value'>{res.barangay}</p>
          </div>
          <div className='b'>
            <p className='label'>MUNICIPALITY</p>
            <p className='value'>{res.municipality}</p>
          </div>
          <div className='a_c'>
            <p className='label'>Province</p>
            <p className='value'>{res.province}</p>
          </div>
        </div>
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


return(
  <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">

          <h1>Patient <span style={{color:"#4D77FF"}}>Profile</span></h1>

          <div className='breadcrumbs_patient_profile'>
              <p onClick={gotoViewPatient}>Manage Patients</p>
              <p>&#62;</p>
              <p>View Patient</p>
          </div>


          {loading ? 
            <div>
              <div className='profile_cover' style={{backgroundImage: `url(${profile_cover})`}}></div>
              {/*Photo and Name */}
              {Photo_Name_Email}
              {/*Mother information*/}
              {Mother_Information}
              {/*Child information*/}
              {Child_Info}
            </div>
            :
            <div className="header_table header_body" id="table_loader" style={{backgroundColor:"transparent",boxShadow:"none"}}>
              <div div className='no_schedule_available'>
                <CircularProgress style={{height:"60px",width:"60px"}}/>
                <p style={{fontSize:"1.3rem"}}>Please wait...</p>
              </div> 
            </div>
          }


        </div>
      </div>
      <Admin_Right_Navigation_Bar/>
    </div>

    
  </div>
)
}


