import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Navigation_Bar from "../Navigation_Bar/NavigationBar";
import "./Home.css";
import Line_BG from "../../Assets/Home_Page/Line_Bg.png";
import Baby_Img from "../../Assets/Home_Page/Baby_Img.png";
import Calendar_Icon from "../../Assets/Icons/Calendar_Icon.png";
import AOS from "aos";
import "aos/dist/aos.css";

import VaccinesDetails from "../../Maps/VaccinesDetails";
import Vaccine_Component from "./VaccineComponent";
import Show_Specific_Vaccine from "./ShowSpecificVaccine";

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
              <a href="#home_page_middle_container" style={{color:"#ffff",textDecoration:"none"}}><div className="btn">Know your vaccine</div></a>
              <LightTooltip title="Make appointment">
                <div className="icon"><img src={Calendar_Icon} alt=""/></div>
              </LightTooltip>
            </div>
         </div>
      </div>
      <div className="right">
        <img src={Baby_Img} alt=""/>
      </div>
    </div>

    <div className="home_page_middle_container">
      
      <div className="top" id="home_page_middle_container">
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
        justifyContent="space-between"
        alignItems="center"
      >
          {VaccineElements3}
       </Grid>  
      </div>
    </div>

    <Show_Specific_Vaccine/>
    
  </div>
)
}