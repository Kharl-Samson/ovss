import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Profile.css";
import moment from "moment";
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import profile_cover from "./Images/profile_cover.png";
import mother_info_icon from "./Images/mother_info_icon.png";
import Admin_Left_Navigation_Bar from '../Navigation_Bar/Left_Nav';
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import CircularProgress from '@mui/material/CircularProgress';


export default function Admin_ViewProfile(){
    //Loading the logo and the title on the Tab of the browser
    document.querySelector("link[rel='shortcut icon']").href = TabLogo;
    document.title = "OVSS | My Profile";
  
    //Profile key
    var key_profile = localStorage.getItem("admin_login_email");
    //Loading while fetching data in axios
    const [loading,setLoading] = useState(false);
    //Hook for view the list of patients
    const [profile, setProfile] = useState([]);  
    const loadProfile = async () =>{
      const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Admin.php");
      setLoading(true);
      setProfile(result.data.phpresult);
    };
    useEffect(() => {
        loadProfile();
    }, []);

    var array_profile_ctr = 0;
    const Photo_Name_Email = profile.map((res) => {
      array_profile_ctr++;
      if(key_profile === res.email)
      return (
      <div className='name_image' key={array_profile_ctr}>
        <img alt="" 
          src={localStorage.getItem("url_admin_img")+res.image}
          onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_admin_img")+"default_avatar.png"}}
        />
        <div className='name_container'>
          <p>{res.first_name+" "+res.last_name}</p>
          <p>{res.email}</p>
        </div>
      </div>
      ); 
    });

    const Personal_Information = profile.map((res) => {
      array_profile_ctr++;
      if(key_profile === res.email)
      return (
      <div className='mother_child_info_container' key={array_profile_ctr}>
        <div className='top'>
          <img alt="" src={mother_info_icon}/>
          <p>Personal Information</p>
        </div>

        <div className='info_container'>
          <div className='a_c'>
            <p className='label'>FIRST NAME</p>
            <p className='value'>{res.first_name}</p>
          </div>
          <div className='b'>
            <p className='label'>MIDDLE NAME</p>
            <p className='value'>{res.middle_name ? res.middle_name : "N/A" }</p>
          </div>
          <div className='a_c'>
            <p className='label'>LAST NAME</p>
            <p className='value'>{res.last_name}</p>
          </div>
        </div>
        <div className='info_container'>
          <div className='a_c'>
            <p className='label'>ADMIN ID</p>
            <p className='value'>{"OVSS-"+res.main_id }</p>
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
      </div>
      ); 
    });


return(
  <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">

          <h1>My <span style={{color:"#4D77FF"}}>Profile</span></h1>

          {loading ? 
            <div>
              <div className='profile_cover' style={{backgroundImage: `url(${profile_cover})`}}></div>
              {/*Photo and Name */}
              {Photo_Name_Email}
              {/*Personal Information*/}
              {Personal_Information}
            </div>
            :
            <div className="header_table header_body" id="table_loader" style={{backgroundColor:"transparent",boxShadow:"none"}}>
              <div div className='no_schedule_available'>
                <CircularProgress style={{height:"60px",width:"60px"}}/>
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


