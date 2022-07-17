import React, { useEffect, useState } from 'react';
import axios from "axios";
import child_info_icon from "./Images/child_info_icon.png";
import Check_Icon from "./Images/Check_Icon.png";
import moment from "moment";

export default function EachChild(props){

  //Loading while fetching data in axios
  const [loading,setLoading] = useState(false);
  //Hook for view the list of vaccine record
  const [recods, setRecords] = useState([]); 

  const loadRecords = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Appointments.php");
    setLoading(true);
    setRecords(result.data.phpresult);
  };
  useEffect(() => {
    loadRecords();
  }, []); 

  var array_record_ctr = 0;
  const records_bcg = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "BCG"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "BCG"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_hepa = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "Hepatitis B"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "Hepatitis B"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_pentevalent1 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "Pentavelent"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "Pentavelent"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });
  const records_pentevalent2 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "2" && 
     res.child_vaccineName === "Pentavelent"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "2" && 
    res.child_vaccineName === "Pentavelent"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });
  const records_pentevalent3 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "3" && 
     res.child_vaccineName === "Pentavelent"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "3" && 
    res.child_vaccineName === "Pentavelent"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_opv1 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "Oral Polio"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "Oral Polio"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });
  const records_opv2 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "2" && 
     res.child_vaccineName === "Oral Polio"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "2" && 
    res.child_vaccineName === "Oral Polio"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });
  const records_opv3 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "3" && 
     res.child_vaccineName === "Oral Polio"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "3" && 
    res.child_vaccineName === "Oral Polio"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_ipv = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "Inactivated Polio"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "Inactivated Polio"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_pvc1 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "Pneumococcal Conjugative"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "Pneumococcal Conjugative"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_pvc2 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "2" && 
     res.child_vaccineName === "Pneumococcal Conjugative"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "2" && 
    res.child_vaccineName === "Pneumococcal Conjugative"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });
  const records_pvc3 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "3" && 
     res.child_vaccineName === "Pneumococcal Conjugative"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "3" && 
    res.child_vaccineName === "Pneumococcal Conjugative"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });

  const records_mmr1 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "1" && 
     res.child_vaccineName === "Measeles, Mumps, Rubella"
    ){
      return (
        <img alt="" src={Check_Icon} key={array_record_ctr}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "1" && 
    res.child_vaccineName === "Measeles, Mumps, Rubella"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });
  const records_mmr2 = recods.map((res) => {
    array_record_ctr++;
    if(localStorage.getItem("patient_profile_key") === res.email &&
     res.child_fname === props.fname && 
     res.child_bdate === props.bday && 
     res.child_sex === props.sex && 
     res.child_placeDelivery === props.place && 
     res.appointment_status === "Done" && 
     res.child_vaccineDose === "2" && 
     res.child_vaccineName === "Measeles, Mumps, Rubella"
    ){
      return (
        <img alt="" src={Check_Icon}/>
       ); 
    }
    else if(localStorage.getItem("patient_profile_key") === res.email &&
    res.child_fname === props.fname && 
    res.child_bdate === props.bday && 
    res.child_sex === props.sex && 
    res.child_placeDelivery === props.place && 
    res.appointment_status === "Approved" && 
    res.child_vaccineDose === "2" && 
    res.child_vaccineName === "Measeles, Mumps, Rubella"
   ){
     return (
        <span style={{color:"red"}}>{moment(res.appointment_date).format('LL')}</span>
      ); 
   }
  });


  function show_record(){
      document.getElementsByClassName("vaccine_record_container")[parseInt(props.classNo)].style.display = "block";
      document.getElementsByClassName("hide_record")[parseInt(props.classNo)].style.display = "block";
      document.getElementsByClassName("show_record")[parseInt(props.classNo)].style.display = "none";
  } 
  function hide_record(){
    document.getElementsByClassName("vaccine_record_container")[parseInt(props.classNo)].style.display = "none";
    document.getElementsByClassName("hide_record")[parseInt(props.classNo)].style.display = "none";
    document.getElementsByClassName("show_record")[parseInt(props.classNo)].style.display = "block";
} 

return(
<div>
<div className='mother_child_info_container' style={{marginBottom:"0",borderBottomLeftRadius:"0",borderBottomRightRadius:"0"}}>
            <div className='top'>
              <img alt="" src={child_info_icon}/>
              <p>Child Information #{props.child_no}</p>
            </div>

            <div className='info_container'>
              <div className='a_c'>
                <p className='label'>FIRST NAME</p>
                <p className='value'>{props.fname}</p>
              </div>
              <div className='b'>
                <p className='label'>MIDDLE NAME</p>
                <p className='value'>{props.mname}</p>
              </div>
              <div className='a_c'>
                <p className='label'>LAST NAME</p>
                <p className='value'>{props.lname}</p>
              </div>
            </div>

            <div className='info_container'>
              <div className='a_c'>
                <p className='label'>CHILD ID</p>
                <p className='value'>{"OVSS-"+props.id}</p>
              </div>
              <div className='b'>
                <p className='label'>BIRTHDAY</p>
                <p className='value'>{moment(props.bday).format('LL')}</p>
              </div>
              <div className='a_c'>
                <p className='label'>DAY'S OLD</p>
                <p className='value' style={{textTransform:"lowercase"}}>{props.age+" day's old"}</p>
              </div>
            </div>

            <div className='info_container'>
              <div className='a_c'>
                <p className='label'>SEX</p>
                <p className='value'>{props.sex}</p>
              </div>
              <div className='b'>
                <p className='label'>WEIGHT</p>
                <p className='value' style={{textTransform:"lowercase"}}>{props.weight+" kg/s"}</p>
              </div>
              <div className='a_c'>
                <p className='label'>PLACE OF DELIVERY</p>
                <p className='value'>{props.place}</p>
              </div>
            </div>

            <div className='view_record'>
              <p className="show_record" onClick={show_record}>View vaccine record <span>&#62;</span></p>
              <p className="hide_record" onClick={hide_record} style={{display:"none"}}>Hide vaccine record <span>&#62;</span></p>
            </div>
          </div>


          {/*Child Vaccine Record */}
          <div className='vaccine_record_container' id="vaccine_record_container">
            <table>
                <tr>
                  <th><span>VACCINE</span></th>
                  <th><span>BIRTH</span></th>
                  <th><span>1 1⁄2 MONTH</span></th>
                  <th><span>2 1⁄2 MONTH</span></th>
                  <th><span>3 1⁄2 MONTHS</span></th>
                  <th><span>9 MONTHS</span></th>
                  <th><span>1 YEAR</span></th>
                </tr>

                <tr>
                  <td><span>BCG</span></td>
                  <td>{records_bcg}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><span>HEPATITIS B</span></td>
                  <td>{records_hepa}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><span>PENTAVALENT VACCINE (DPT-Hep B-HiB)</span></td>
                  <td></td>
                  <td>{records_pentevalent1}</td>
                  <td>{records_pentevalent2}</td>
                  <td>{records_pentevalent3}</td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><span>ORAL POLIO VACCINE (OPV)</span></td>
                  <td></td>
                  <td>{records_opv1}</td>
                  <td>{records_opv2}</td>
                  <td>{records_opv3}</td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><span>INACTIVATED POLIO VACCINE (IPV)</span></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{records_ipv}</td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><span>PNEUMOCOCCAL CONJUGATE VACCINE (PVC)</span></td>
                  <td></td>
                  <td>{records_pvc1}</td>
                  <td>{records_pvc2}</td>
                  <td>{records_pvc3}</td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><span>MEASLES, MUPS, RUBELLA (MMR)</span></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{records_mmr1}</td>
                  <td>{records_mmr2}</td>
                </tr>
            </table>
          </div>
</div>
)
}