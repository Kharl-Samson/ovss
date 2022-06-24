import React from "react";
import Grid from '@mui/material/Grid';
import Injection_Icon from "../../Assets/Icons/Injection_Icon.png";

export default function Vaccine_Component(props){
    return(
    <div className="box">
        <div className="top">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <div className="img_container"><img src={Injection_Icon} alt=""/></div>
            <p>{props.name}</p>
          </Grid>  
        </div>
        <div className="bot">
          <p>{props.short_desc}&nbsp;&nbsp;&nbsp;<span>see more....</span></p>
        </div>
    </div>
    )
}