
import React from "react";
import { v1 as uuid } from "uuid";
import IPage from '../types/pages';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const CreateRoom = props => {
  const create = () => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <div className="StartPage d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(45deg, #03A9F4, #4CAF50)' }}>
      {/* <button onClick={create}>Create room</button> */}
      <Fab variant="extended"  onClick={create} style={{fontFamily: "Balsamiq Sans"}}><AddIcon style={{marginRight: "5px"}}/> Create room</Fab>
    </div>
  )
};

export default CreateRoom;