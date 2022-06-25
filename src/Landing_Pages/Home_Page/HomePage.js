import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Logo from "../../Assets/Logo/Logo.png";
import Navigation_Bar from "../Navigation_Bar/NavigationBar";
import "./Home.css";
import Line_BG from "../../Assets/Home_Page/Line_Bg.png";
import Line_BG_1 from "../../Assets/Home_Page/Line_Bg_1.png";
import Baby_Img from "../../Assets/Home_Page/Baby_Img.png";
import Calendar_Icon from "../../Assets/Icons/Calendar_Icon.png";
import Features_1 from "../../Assets/Home_Page/Features_1.png";
import Features_2 from "../../Assets/Home_Page/Features_2.png";
import Features_3 from "../../Assets/Home_Page/Features_3.png";
import Features_4 from "../../Assets/Home_Page/Features_4.png";

import Injection_Icon_with_background from "../../Assets/Icons/Injection_Icon_with_background1.png";
import Security_Icon_with_background from "../../Assets/Icons/Security_Icon_with_background.png";
import Time_Icon_with_background from "../../Assets/Icons/Time_Icon_with_background.png";

import VaccinesDetails from "../../Maps/VaccinesDetails";
import Vaccine_Component from "./VaccineComponent";
import Show_Specific_Vaccine from "./ShowSpecificVaccine";
import Footer from "../Footer/Footer";

export default function HomePage(){
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


  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Home Page";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("home_span_nav").style.color = "#4D77FF";
    document.getElementById("landing_page_navigation").style.backgroundColor = "#F7F7FF";
  }, 10);

  //Stepper Vaccine in typees of vaccine
  var step_no = 1;
  function next_stepper_function(){
    if(step_no < 3){
      step_no++;
    }
    if(step_no === 1){
      document.getElementById("vaccine_bottom1").style.display = "flex";
      document.getElementById("vaccine_bottom2").style.display = "none";
      document.getElementById("vaccine_bottom3").style.display = "none";
    }
    else if(step_no === 2){
      document.getElementById("vaccine_bottom1").style.display = "none";
      document.getElementById("vaccine_bottom2").style.display = "flex";
      document.getElementById("vaccine_bottom3").style.display = "none";
    }
    else if(step_no === 3){
      step_no = 3;
      document.getElementById("vaccine_bottom1").style.display = "none";
      document.getElementById("vaccine_bottom2").style.display = "none";
      document.getElementById("vaccine_bottom3").style.display = "flex";
    }
  }
  function back_stepper_function(){
    if(step_no > 1){
      step_no--;
    }
    if(step_no === 1){
      document.getElementById("vaccine_bottom1").style.display = "flex";
      document.getElementById("vaccine_bottom2").style.display = "none";
      document.getElementById("vaccine_bottom3").style.display = "none";
    }
    else if(step_no === 2){
      document.getElementById("vaccine_bottom1").style.display = "none";
      document.getElementById("vaccine_bottom2").style.display = "flex";
      document.getElementById("vaccine_bottom3").style.display = "none";
    }
    else if(step_no === 3){
      step_no = 3;
      document.getElementById("vaccine_bottom1").style.display = "none";
      document.getElementById("vaccine_bottom2").style.display = "none";
      document.getElementById("vaccine_bottom3").style.display = "flex";
    }
  }

  //Vaccine Details from map
  var vaccine_ctr1 = -1;
  const VaccineElements1 = VaccinesDetails.map(res =>{
    vaccine_ctr1++;
    if(vaccine_ctr1 < 3){
      return <Vaccine_Component
              key = {vaccine_ctr1}
              name = {res.vaccine_name}
              short_desc = {res.vaccine_description_short}
              name1 = {res.spec_name1}
              name2 = {res.spec_name2}
              ques1 = {res.spec_ques1}
              ques2 = {res.spec_ques2}
              ques3 = {res.spec_ques3}
              ans1 = {res.spec_ans1}
              ans2 = {res.spec_ans2}
              ans3 = {res.spec_ans3}
            />
    }
  })
  var vaccine_ctr2 = -1;
  const VaccineElements2 = VaccinesDetails.map(res =>{
    vaccine_ctr2++;
    if(vaccine_ctr2 < 3){
      return "";
    }
    else if(vaccine_ctr2 < 6){
      return <Vaccine_Component
              key = {vaccine_ctr2}
              name = {res.vaccine_name}
              short_desc = {res.vaccine_description_short}
              name1 = {res.spec_name1}
              name2 = {res.spec_name2}
              ques1 = {res.spec_ques1}
              ques2 = {res.spec_ques2}
              ques3 = {res.spec_ques3}
              ans1 = {res.spec_ans1}
              ans2 = {res.spec_ans2}
              ans3 = {res.spec_ans3}
            />
    }
  })
  var vaccine_ctr3 = -1;
  const VaccineElements3 = VaccinesDetails.map(res =>{
    vaccine_ctr3++;
    if(vaccine_ctr3 < 3){
      return "";
    }
    else if(vaccine_ctr3 < 6){
      return "";
    }
    else{
      return <Vaccine_Component
              key = {vaccine_ctr3}
              name = {res.vaccine_name}
              short_desc = {res.vaccine_description_short}
              name1 = {res.spec_name1}
              name2 = {res.spec_name2}
              ques1 = {res.spec_ques1}
              ques2 = {res.spec_ques2}
              ques3 = {res.spec_ques3}
              ans1 = {res.spec_ans1}
              ans2 = {res.spec_ans2}
              ans3 = {res.spec_ans3}
            />
    }
  })


return(
  <div>
    <Navigation_Bar/>

    <div className="home_page_top_container"
      style={{
        backgroundImage: `url(${Line_BG})`
      }}
    >
      <div className="left">
         <div className="tagline_content">
            <p>Get Vaccine, Boost Your Health</p>
            <p>Get <span style={{color:"#6045E2"}}>Vaccinated</span></p>
            <p>Now Easily with</p>
            <p>OVSS</p>

            <p className="mini_tagline_text">OVSS will help you to know your vaccine in Brgy Pinagbarilan from your house fast and easily to help you.</p>

            <div className="get_your_vaccine_btn">       
              <a href="#Types_of_vaccines" style={{color:"#ffff",textDecoration:"none"}}><div className="btn">Know your vaccine</div></a>
              <Link to="/Schedule">
              <LightTooltip title="Make appointment">
                <div className="icon"><img src={Calendar_Icon} alt=""/></div>
              </LightTooltip>
              </Link>
            </div>
         </div>
      </div>
      <div className="right">
        <img src={Baby_Img} alt=""/>
      </div>
    </div>

    <div className="home_page_middle_container">
      <div className="top" id="Types_of_vaccines">
        <div className="left">
          <p>Types of vaccines</p>
          <p>Vaccine Variant</p>
        </div>
        <div className="right">
            <LightTooltip title="Back">
              <div className="left_arrow" onClick={back_stepper_function}></div>
            </LightTooltip>
            <LightTooltip title="Next">
              <div className="right_arrow" onClick={next_stepper_function}></div>
            </LightTooltip>
        </div>
      </div>

      <div className="bottom" id="vaccine_bottom1" data-aos="fade-right" data-aos-duration="1000">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
          {VaccineElements1}
       </Grid>   
      </div>

      <div className="bottom" id="vaccine_bottom2" style={{display:"none"}}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
          {VaccineElements2}
       </Grid>  
      </div>

      <div className="bottom" id="vaccine_bottom3" style={{display:"none"}}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
          {VaccineElements3}
       </Grid>  
      </div>
    </div>

    <div className="home_page_semi_bottom_container">
      <h1>What you get with our vaccine scheduling solutions</h1>
      
      <div className="container">
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <div className="box" data-aos="fade-right" data-aos-duration="1000">
           <div className="top"><img src={Features_1} alt=""/></div>
           <div className="bot">
              <p>All connected and integrated into one system</p>
              <p>Everything is managed by a single system, including appointment scheduling, arrivals, and queue management.</p>
           </div>
        </div>
        <div className="box" data-aos="fade-right" data-aos-duration="1000">
           <div className="top"><img src={Features_2} alt=""/></div>
           <div className="bot">
              <p>Strong solutions for widespread immunizations</p>
              <p>Solutions constructed on a strong and reliable infrastructure that manages hundreds of client journeys in Brgy. Pinagbarilan.</p>
           </div>
        </div>
        <div className="box" data-aos="fade-left" data-aos-duration="1000">
           <div className="top"><img src={Features_3} alt=""/></div>
           <div className="bot">
              <p>Encourage safety and social distancing measures</p>
              <p>We assist you in maintaining safety precautions while interacting with a big number of people by providing alternatives for virtual queuing.</p>
           </div>
        </div>
        <div className="box" data-aos="fade-left" data-aos-duration="1000">
           <div className="top"><img src={Features_4} alt=""/></div>
           <div className="bot">
              <p>A quick and easy patient journey</p>
              <p>To keep residents going smoothly throughout the entire process, set up automatic updates, reminders, and notifications.</p>
           </div>
        </div>
      </Grid>
      </div>
    </div>

    <div className="home_page_bottom_container1"
      style={{
        backgroundImage: `url(${Line_BG_1})`
      }}
    >
      <h1>About <span style={{color:"#4D77FF"}}>Us</span></h1>

      <div className="box"  data-aos="fade-up" data-aos-duration="800">
        <img src={Logo} alt="" className="logo"/>
        <p className="logo_abbv">Online Vaccination Scheduling System</p>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <div className="content">
              <img src={Injection_Icon_with_background} alt=""/>
              <p>Get Vaccine</p>
              <p>Easier</p>
          </div>
          <div className="content">
            <img src={Security_Icon_with_background} alt=""/>
            <p>Get Vaccine</p>
            <p>Easier</p>
          </div>
          <div className="content">
            <img src={Time_Icon_with_background} alt=""/>
            <p>Get Vaccine</p>
            <p>Easier</p>
          </div>
        </Grid>
      </div>
    </div>

    <div className="home_page_bottom_container2">
      <h1><span style={{color:"#4D77FF"}}>Need</span> help?</h1>
      <a href="mailto:ovss2022@gmail.com" target="_blank">
        <div>Contact Now</div>
      </a>
    </div>

    {/*Specific Vaccine Container */}
    <Show_Specific_Vaccine/>

    {/*Footer */}
    <Footer/>
    
  </div>
)
}