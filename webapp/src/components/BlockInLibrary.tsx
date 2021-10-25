import React, { useState } from 'react';
import '../styles/Library.scss';
import Draggable, { DraggableCore } from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import * as BlockService from '../services/block.service';
import { useDispatch } from 'react-redux'
import { addBlock } from '../features/blocks';
import ModalCreateSpace from './ModalCreateSpace';
import { useParams, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BlockLibrary: React.FunctionComponent<any> = props => {
  const { block } = props;
  const [isShowModal, setIsShowModal] = useState(false);
  const query = useQuery();

  const dispatch = useDispatch()

  const [dragState, setDragState] = useState({
    activeDrags: 0,
  })
  // const { _id: workspaceId } = JSON.parse(localStorage.getItem('workspace') || '');
  const { workspaceId } = useParams();


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
  };

  const dragHandlers = {
    onStart: onStart,
    onStop: onStop
  };

  const buttonCanCreate = [
    'space', 'text'
  ]

  const createBlock = () => {
    if (buttonCanCreate.includes(block.type)) {
      BlockService.createBlock(block.name, block.type, workspaceId, query.get('page') || 1).then(block => {
        return dispatch(addBlock(block))
      })
    } else {
      setIsShowModal(true);
    }
  }

  return (
    <>
      <Draggable handle="strong" {...dragHandlers}>
        <div className='BlockLibrary mb-3'>
          <div className={`block d-flex align-items-center justify-content-center ${block.isRelease ? '' : 'block-disabled'}`}>
            <div className={`position-relative img-container`}>
              <img src={block.image} />
              <div onClick={createBlock} className='btn-create'>
                <FontAwesomeIcon icon={faPlusSquare} />
              </div>
            </div>
          </div>
          {
            !block.isRelease && (
              <div className='coming-soon'>
                Coming soon
              </div>
            )
          }
          <span className='name'>{block.name}</span>
        </div>
      </Draggable>
      {
        isShowModal && (
          <>
            <ModalCreateSpace show={isShowModal} onHide={() => setIsShowModal(false)} handleClose={setIsShowModal}></ModalCreateSpace>
          </>
        )
      }
    </>
  )
}

export default BlockLibrary;
