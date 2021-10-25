import React, { useEffect, useState } from 'react';
import IPage from '../types/pages';
import * as WorkspaceService from '../services/workspace.service';
import { useParams, useLocation } from 'react-router-dom';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { updatePage } from '../features/pages';
import { updateWorkspace } from '../features/workspace';
import '../styles/Pagination.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaginationComponent: React.FunctionComponent<IPage> = props => {
  const dispatch = useDispatch();

  // const [workspace, setWorkspace] = useState<any>({});
  const workspace = useSelector((state: any) => {
    return state.workspace.value
  }) || [];

  const setWorkspace = (x) => {
    return dispatch(updateWorkspace(x));
  }

  const [shouldRender, setShouldRender] = useState(false);
  const query = useQuery();
  const page = useSelector((state: any) => {
    return state.page.value
  })
  const history = useHistory();
  const { workspaceId } = useParams();

  useEffect(() => {
    WorkspaceService.getWorkspaceInfo(workspaceId).then(workspace => {
      setWorkspace(workspace);
      setShouldRender(true);

      return dispatch(updatePage(query.get('page') || 1));
    })
  }, [])

  const navigateToPage = (isNext = true) => {
    if (isNext) {
      if (+page < workspace.spaces.length) {
        history.push(`${workspaceId}?page=${+page + 1}`);
        return dispatch(updatePage(+page + 1));
      }
    } else {
      if (+page > 1) {
        history.push(`${workspaceId}?page=${+page - 1}`);
        // setPage(+page - 1);
        return dispatch(updatePage(+page - 1));
      }
    }
  }

  return (
    <>
      {
        shouldRender ? (
          <div className="PaginationComponent">
            {
              <>
                <h3 className="space-name">{workspace.spaces[+page - 1].name}</h3>
                <div className="d-flex">
                  <div className="arrow-nav mr-4 cursor-pointer center-div" onClick={() => navigateToPage(false)}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  </div>
                  <div className="current-page mr-4">
                    {page}
                  </div>
                  <div className={`arrow-nav center-div ${+page < workspace.spaces.length ? 'cursor-pointer' : ''}`} onClick={() => navigateToPage()}>
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  </div>
                </div>
              </>
            }

          </div>
        ) : <></>
      }
    </>
  )
}

export default PaginationComponent;
