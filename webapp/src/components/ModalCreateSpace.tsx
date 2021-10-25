import { Input, InputLabel, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import * as WorkspaceService from '../services/workspace.service';
import { useDispatch } from 'react-redux'
import { updateWorkspace } from '../features/workspace';
import '../styles/Home.scss';
import { useParams } from 'react-router-dom';

const ModalCreateSpace: React.FunctionComponent<any> = props => {
  const dispatch = useDispatch();
  const { handleClose } = props;

  const [spaceInfo, setSpaceInfo] = useState<any>({
    name: '',
    img: ''
  })
  const [isUploading, setIsUploading] = useState(false);
  const { workspaceId } = useParams();

  // const { _id: workspaceId } = JSON.parse(localStorage.getItem('workspace') || '');

  const onInputName = (e: any) => {
    setSpaceInfo({
      ...spaceInfo,
      name: e.target.value
    })
  }

  const onInputImage = (e: any) => {
    setSpaceInfo({
      ...spaceInfo,
      img: e.target.files[0]
    })
  }

  const createSpace = () => {
    const data = new FormData();
    data.append('name', spaceInfo.name);
    data.append('img', spaceInfo.img);

    WorkspaceService.createNewSpace(workspaceId, data).then(x => {
      handleClose(false);
      setIsUploading(false);
      return dispatch(updateWorkspace(x))
    });

    setIsUploading(true)
  }

  const handleChange = (e) => {
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add zone
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='info mb-4'>
            <InputLabel className='mb-4'>
              <strong>
                Name&nbsp;
            </strong>
            </InputLabel>
            <Input type="text" placeholder="Space name" onChange={onInputName} value={spaceInfo.name} fullWidth={true}></Input>
          </div>
          <div className='info mb-4'>
            <InputLabel className='mb-4'>
              <strong>
                Image&nbsp;
            </strong>
            </InputLabel>
            <div className='upload-zone d-flex justify-content-center align-items-center'>
              <label htmlFor="upload-photo" className='cursor-pointer'>
                {
                  isUploading ? (
                    <img src="https://res.cloudinary.com/kittyholic/image/upload/v1632307903/loading_fmeg5b.svg" />

                  ) : (
                    <img src="https://res.cloudinary.com/kittyholic/image/upload/v1632242599/upload_llftyl.svg"/>
                  )
                }
                <p>{!spaceInfo.img ? 'Choose Image' : spaceInfo.img.name}</p>
              </label>
              <input type="file" placeholder="Space name" onChange={onInputImage} id="upload-photo"></input>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" className='kt-btn' onClick={createSpace}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateSpace;
