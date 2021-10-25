import React, { useState } from 'react';
import IPage from '../types/pages';
import '../styles/Start.scss';
import { Button, Input, InputLabel } from '@material-ui/core';
import * as WorkspaceService from '../services/workspace.service';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const StartPage: React.FunctionComponent<IPage> = props => {
  const [name, setName] = useState('');
  const [workspace, setWorkspace] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [spaceInfo, setSpaceInfo] = useState<any>({
    name: '',
    img: ''
  })

  const history = useHistory();

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const createWorkspace = () => {
    WorkspaceService.createNewWorkspace(name).then(e => {
      setWorkspace(e);
    })
  }

  const onInputImage = (e) => {
    setSpaceInfo({
      ...spaceInfo,
      img: e.target.files[0]
    })
  }

  const onInputName = (e) => {
    setSpaceInfo({
      ...spaceInfo,
      name: e.target.value
    })
  }

  const onClickCreate = (e) => {
    const data = new FormData();
    data.append('name', spaceInfo.name);
    data.append('img', spaceInfo.img);

    WorkspaceService.createNewSpace(workspace._id, data).then(x => {
      // handleClose(false);
      localStorage.setItem('workspace', JSON.stringify(x));
      setIsUploading(false);
      history.push(`/workspace/${workspace._id}?page=1`);

      // return dispatch(updateWorkspace(x))
    });
    setIsUploading(true)
  }

  return <div className="StartPage d-flex justify-content-center align-items-center">
    {
      !workspace ? (
        <div className='container'>
          <div className='welcome'>
            Welcome to &nbsp;<img src="https://res.cloudinary.com/kittyholic/image/upload/v1632307455/logo_xabsum.svg"/>weHuddle...
    </div>
          <div className='input-workspace'>
            <Input type="text" placeholder="Input your workspace's name" onChange={handleChangeName} />
          </div>
          <Button variant="outlined" onClick={createWorkspace}>Create</Button>
        </div>
      ) : (
        <div>
          <span>Create first {workspace.name}'s zone</span>
          <Form style={{ width: "500px"}}>
            <div className='info my-4'>
              <InputLabel className='mb-2'>
                <strong>
                  Name&nbsp;
            </strong>
              </InputLabel>
              <Input type="text" placeholder="Zone's name" onChange={onInputName} value={spaceInfo.name} fullWidth={true}></Input>
            </div>
            <div className='info mb-4'>
              <InputLabel className='mb-2'>
                <strong>
                  Image&nbsp;
            </strong>
              </InputLabel>
              <div className='upload-zone d-flex justify-content-center align-items-center' style={{ width: "500px" }}>
                <label htmlFor="upload-photo" className='text-center cursor-pointer'>
                  {
                    isUploading ? (
                      <img src="https://res.cloudinary.com/kittyholic/image/upload/v1632307903/loading_fmeg5b.svg" />

                    ) : (
                      <img src="https://res.cloudinary.com/kittyholic/image/upload/v1632242599/upload_llftyl.svg" />
                    )
                  }
                  <p style={{ fontSize: '1rem' }}>{!spaceInfo.img ? 'Choose Image' : spaceInfo.img.name}</p>
                </label>
                <input type="file" placeholder="Space name" onChange={onInputImage} id="upload-photo"></input>
              </div>
            </div>
            <Button variant="outlined" className='' onClick={onClickCreate}>Create</Button>
          </Form>
        </div>
      )
    }

  </div>
}

export default StartPage;
