import React from "react";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TaskIcon from '@mui/icons-material/Task';

export default function Middle_Nav_Part(){

    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);
        const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    

    return(
    <div className="middle">

        <div className="top">
          <div className="left">
              <p>Task Scheduler</p>
              <p>{moment().format('LL')}</p>
          </div>
          <div className="right">
              <div className="add_task_btn">+ Add Task</div>
              <MoreVertIcon 
                 fontSize="large" 
                 id="view_all_task_btn"
                 onClick={handleClick1}
                 size="small"
                 sx={{color:"white",marginRight:"-12px"}}
                 aria-controls={open1 ? 'account-menu1' : undefined}
                 aria-haspopup="true"
                 aria-expanded={open1 ? 'true' : undefined}
                 title="Your profile" 
                />
              <Menu
                anchorEl={anchorEl1}
                id="account-menu1"
                open={open1}
                onClose={handleClose1}
                onClick={handleClose1}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem style={{display:"none"}}></MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <TaskIcon fontSize="medium"/>
                    </ListItemIcon>
                    View all task &nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="semitop">
           <div className="box">
              <p>Tue</p>
              <p>21</p>
           </div>
           <div className="box">
              <p>Wed</p>
              <p>22</p>
           </div>
           <div className="box box_active">
              <p>Thu</p>
              <p>23</p>
           </div>
           <div className="box">
              <p>Fri</p>
              <p>24</p>
           </div>
           <div className="box">
              <p>Sat</p>
              <p>25</p>
           </div>
        </div>

        <div className="bottom">

          <div className="box">
              <div className="left">
                 <p>12:00 am</p>
              </div>
              <div className="right"></div>
          </div>   

          <div className="box">
              <div className="left">
                 <p>12:00 am</p>
              </div>
              <div className="right"></div>
          </div>   

          <div className="box">
              <div className="left">
                 <p>12:00 am</p>
              </div>
              <div className="right"></div>
          </div>   

        </div>
        
        <div style={{width:"100%",height:"10px"}}></div>
    </div>
    )
}