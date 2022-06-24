import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Website_Logo from "../../Assets/Logo/Logo.png";
import Grid from '@mui/material/Grid';
import FB_Footer from "../../Assets/Icons/FB_Footer.png";
import Email_Footer from "../../Assets/Icons/Email_Footer.png";

export default function Footer(){
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

    return(
    <footer>
      <div className="top">
        <div className="left">
            <img src={Website_Logo} alt=""/>
            <p>Be safe, Get Vaccinated</p>
        </div>
        <div className="right">
        <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
        >
            <div className="box">
                <p>Overview</p> 
                <p><Link to="/" className="Link_React_footer">Home</Link></p>
                <p><Link to="/Announcemnents" className="Link_React_footer">Announcement</Link></p>
                <p><Link to="/Geotagging" className="Link_React_footer">Geotagging</Link></p>
                <p><Link to="/Schedule" className="Link_React_footer">Schedule</Link></p>
            </div>
            <div className="box">
                <p>Explore</p>
                <p><Link to="#" className="Link_React_footer">Terms & Conditions</Link></p>
                <p><Link to="#" className="Link_React_footer">Privacy Policy</Link></p>
            </div>
            <div className="box">
                <p>Social Media</p>
                <div className="socmed_container">
                    <LightTooltip title="Visit Facebook">
                    <a href="#" target="_blank">
                        <img src={FB_Footer} alt=""/>
                    </a>
                    </LightTooltip>
                    <LightTooltip title="Mail to">
                    <a href="mailto:ovss2022@gmail.com" target="_blank">
                        <img src={Email_Footer} alt=""/>
                    </a>
                    </LightTooltip>
                </div>
                
            </div>
        </Grid>
        </div>
      </div>
      <div className="bottom">©2022 OVSS. All Rights  Reserved. </div>
    </footer>
    )
}