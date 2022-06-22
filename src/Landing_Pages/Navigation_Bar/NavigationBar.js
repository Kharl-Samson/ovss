import React from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import Website_Logo from "../../Assets/Logo/Logo.png";
import Menu_Bar from "../../Assets/Icons/MenuBar.png";


import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import TerrainIcon from '@mui/icons-material/Terrain';
import DateRangeIcon from '@mui/icons-material/DateRange';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Signup_Page from "../LoginRegister_Pages/SignupPage";
import CloseModals from "../../Functions/CloseModals";


export default function Navigation_Bar(){

     const [state, setState] = React.useState({
        left: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            <Link to="/" className="Link_React">
            <ListItem>
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            </Link>

            <Link to="/Announcemnents" className="Link_React">
            <ListItem>
                <ListItemIcon>
                  <CampaignIcon/>
                </ListItemIcon>
                <ListItemText primary="Announcements" />
            </ListItem>
            </Link>

            <Link to="/Geotagging" className="Link_React">
            <ListItem>
                <ListItemIcon>
                  <TerrainIcon/>
                </ListItemIcon>
                <ListItemText primary="Geotagging" />
            </ListItem>
            </Link>

            <Link to="/Schedule" className="Link_React">
            <ListItem>
                <ListItemIcon>
                  <DateRangeIcon/>
                </ListItemIcon>
                <ListItemText primary="Schedule" />
            </ListItem>
            </Link>

            <Link to="/CovidCases" className="Link_React">
            <ListItem>
                <ListItemIcon>
                  <VaccinesIcon/>
                </ListItemIcon>
                <ListItemText primary="Covid Cases" />
            </ListItem>
            </Link>
            
          </List>

          <Divider />

          <List>
            <Link to="#" className="Link_React">
            <ListItem>
                <ListItemIcon>
                  <HowToRegIcon/>
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
            </ListItem>
            </Link>

            <ListItem onClick={Show_login_modal}>
                <ListItemIcon>
                  <LoginIcon/>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
            </ListItem>
          </List>
        </Box>
      );


  //Show Login Modal
  function Show_login_modal(){
    document.getElementById("Login_Modal_Container").style.display = "flex";
    document.getElementById("email_input").value = localStorage.getItem("email_input");
    document.getElementById("password_input").value = localStorage.getItem("password_input");
  }

    return(
       <nav>
        <div className="left">
            <img src={Website_Logo}/>
        </div>

        <div className="center">

            <Link to="/" className="Link_React">
                <span id="home_span_nav">Home</span>
            </Link>  
            <Link to="/Announcemnents" className="Link_React">
                <span id="announcement_span_nav">Announcements</span>
            </Link>              
            <Link to="/Geotagging" className="Link_React">
                <span id="geotagging_span_nav">Geotagging</span>
            </Link>        
            <Link to="/Schedule" className="Link_React">
                <span id="schedule_span_nav">Schedule</span>
            </Link>        
            <Link to="/CovidCases" className="Link_React">
                <span id="covid_span_nav">Covid Cases</span>
            </Link>        

        </div>

        <div className="right">
            <span>Sign Up</span>
      
            <div className="signup_btn" onClick={Show_login_modal}>Sign In</div>

            {['left'].map((anchor) => (
               <React.Fragment key={anchor}>
               <img src={Menu_Bar} onClick={toggleDrawer(anchor, true)}/> 
               <SwipeableDrawer
                   anchor={anchor}
                   open={state[anchor]}
                   onClose={toggleDrawer(anchor, false)}
                   onOpen={toggleDrawer(anchor, true)}
               >
                   {list(anchor)}
               </SwipeableDrawer>
               </React.Fragment>
            ))}
        </div>

        {/*Login and Register Component */}
        <Signup_Page/>

       {/*Close modals functions */}
       <CloseModals/>

       </nav>
    )
}