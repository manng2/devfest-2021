import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import * as BlockService from '../services/block.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { v1 as uuid } from "uuid";
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';

const BlockLikeRoom: React.FunctionComponent<any> = props => {
  const { block } = props;
  const dispatch = useDispatch()
  const [box, setBox] = useState(block)

  const [dragState, setDragState] = useState({
    activeDrags: 0,
  })

  const onStart = (e) => {
    setDragState({
      ...dragState,
      activeDrags: ++dragState.activeDrags
    });
  };
  const onStop = (e) => {
    setDragState({
      ...dragState,
      activeDrags: --dragState.activeDrags
    })
    const element = document.getElementById(`${block._id}`);
    if (element) {
      const spaces = element.getBoundingClientRect();
      const { x, y } = spaces;
      const box = {
        ...block,
        x,
        y
      }

      BlockService.updateBlock(box).then(res => {
      })
    }
  };

  const dragHandlers = {
    onStart: onStart,
    onStop: onStop
  };

  useEffect(() => {
    const element = document.getElementById(`${block._id}`);
    if (element) {
      element.style.left = `${block.x - 10}px`;
      element.style.top = `${block.y - 10}px`;
    }
  }, [])


  const createRoom = () => {
    const roomId = uuid();
    const newBlock = {
      ...block,
      link: `/room/${roomId}`
    }

    BlockService.updateBlock(newBlock).then(block => {
      setBox(block)
    })
  }

  const joinRoom = () => {
    window.open(box.link, '_blank');
  }

  return (
    <Draggable handle="strong" {...dragHandlers}>
      <div className="box no-cursor kt-block" id={box._id}>
        <div className='block-name p-2 mb-2'>
          <strong className="cursor"><div>{box.name}</div></strong>
        </div>
        <div className='members position-relative mb-3'>
          0&nbsp;
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          <div className='online-dot'>
          </div>
        </div>
        {
          box.link ? (
            <Button variant="outlined" onClick={joinRoom}>Join</Button>
          ) : (
            <Button onClick={createRoom}>Create</Button>
          )
        }
      </div>
    </Draggable>
  )
}

export default BlockLikeRoom;

