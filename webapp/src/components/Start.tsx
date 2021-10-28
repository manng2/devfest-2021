import React, { useState } from 'react';
import IPage from '../types/pages';
import '../styles/Start.scss';
import { Button, Input, InputLabel } from '@material-ui/core';
import * as WorkspaceService from '../services/workspace.service';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { url } from 'inspector';
import backgroundImageStartPage from '../image/bgStartPage.png';
import backgroundImageBlurStartPage from '../image/bgStartPageBlur.png';

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

  return <div className="StartPage d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${workspace ? backgroundImageBlurStartPage : backgroundImageStartPage})`, backgroundSize: 'cover'}}>
    {
      !workspace ? (
        <div>
          <div className='welcome'>
            Workspace for designer &nbsp;<img src="https://res.cloudinary.com/kittyholic/image/upload/v1632307455/logo_xabsum.svg"/> MAD Hub...
    </div>
          <div className='input-workspace'>
            <Input type="text" placeholder="Create or enter your workspace's name" onChange={handleChangeName} />
          </div>
          <Button variant="outlined" onClick={createWorkspace}>Enter</Button>
        </div>
      ) : (
        <div style={{padding: '1em', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgb(0 0 0 / 20%)', WebkitBoxShadow: '0 2px 10px rgb(0 0 0 / 20%)', border: '1px solid #ccc'}}>
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
