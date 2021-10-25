
import React from "react";
import { v1 as uuid } from "uuid";
import IPage from '../types/pages';

const CreateRoom = props => {
  const create = () => {
      const id = uuid();
      props.history.push(`/room/${id}`);
  }

  return (
    <button onClick={create}>Create room</button>
  )
};

export default CreateRoom;