import React, { useEffect } from 'react';
import '../styles/DragAndDrop.scss';
import * as BlockService from '../services/block.service';
import * as WorkspaceService from '../services/workspace.service';
import Block from '../types/block';
import BlockLikeRoom from './BlockLikeRoom';
import { useSelector, useDispatch } from 'react-redux'
import { getBlocks } from '../features/blocks';
import BlockLikeText from './BlockLikeText';
import { useParams, useLocation } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const setBackgroundImage = (url) => {
  const homeElement = document.getElementById('home');

  if (homeElement) {
    homeElement.style.backgroundImage = `url('${url}')`;
  }
}

const DragAndDrop: React.FunctionComponent<any> = props => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();

  const boxes = useSelector((state: any) => {
    return state.blocks.value
  }) || [];

  const page = useSelector((state: any) => {
    return state.page.value
  })

  useEffect(() => {
    BlockService.getBlocks(workspaceId, +page).then((blocks: Block[]) => {
      WorkspaceService.getSpaceInfo(workspaceId, +page).then(spaceInfo => {
        setBackgroundImage(spaceInfo.img);
      })
      blocks = blocks.map(block => {
        return {
          ...block,
          members: 0
        }
      })
      return dispatch(getBlocks(blocks))
    })

    const boxElements = document.querySelectorAll<HTMLElement>('.box');
    Array.from(boxElements).forEach((el) => {
      const box = boxes.find(e => e._id === el.id);

      if (box) {
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
      }
    })
  }, [page])

  return (
    <div className="DragAndDrop">
      {
        boxes.map(box => {
          return (
            box.type === 'space' ? (
              <BlockLikeRoom block={box} key={box._id}></BlockLikeRoom>
            ) : box.type === 'text' ? (
              <BlockLikeText block={box} key={box._id}></BlockLikeText>
            ) : <h1>Hello</h1>
          )
        })
      }
      <PaginationComponent/>
    </div>
  )
}

export default DragAndDrop;
