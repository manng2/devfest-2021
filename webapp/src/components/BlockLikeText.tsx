import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import * as BlockService from '../services/block.service';
import { v1 as uuid } from "uuid";
import { useDispatch } from 'react-redux'

const BlockLikeText: React.FunctionComponent<any> = props => {
  const { block } = props;
  const dispatch = useDispatch()
  const [box, setBox] = useState(block)

  const [dragState, setDragState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
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

  const handleInput = (e) => {
    const newBlock = {
      ...block,
      text: e.target.value
    }

    BlockService.updateBlock(newBlock).then(block => {
      setBox(block);
    })
  }

  const calcRows = () => {
    if (box && box.text) {
      const numberOfLineBreaks = (box.text.match(/\n/g) || []).length;

      return numberOfLineBreaks;
    }

  }

  return (
    <Draggable handle="strong" {...dragHandlers}>
      <div className="box no-cursor box-text kt-block" id={box._id}>
        <div className='block-name p-2 mb-2'>
          <strong className="cursor"><div>{box.name}</div></strong>
        </div>
        {
          <textarea placeholder="Type something..." value={box.text} onInput={handleInput} rows={5}></textarea>
        }
      </div>
    </Draggable>
  )
}

export default BlockLikeText;

