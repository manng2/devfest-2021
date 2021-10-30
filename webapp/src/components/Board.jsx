import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import BackupIcon from '@mui/icons-material/Backup';
import SaveIcon from '@mui/icons-material/Save';
import * as nftService from '../services/nft.service';
import { Input, InputLabel, FormControl, Modal, Box, Fab, Snackbar, IconButton } from '@mui/material';
import { Toast, Button } from 'react-bootstrap';
import '../styles/Board.scss';
import { FormGroup } from '@material-ui/core';


class Board extends React.Component {

    timeout;
    socket = io.connect("http://localhost:8000");

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);

        this.socket.on("canvas-data", function (data) {
            const root = this;
            const interval = setInterval(function () {
                if (root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                const image = new Image();
                const canvas = document.querySelector('#board');
                const ctx = canvas && canvas.getContext('2d');
                image.onload = function () {
                    if (ctx) {
                        ctx.drawImage(image, 0, 0);

                        root.isDrawing = false;
                    }
                };
                image.src = data;
            }, 200)
        })
        this.state = {
            openModal: false,
            name: '',
            description: '',
            openToast: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCloseToast = this.handleCloseToast.bind(this);
        this.handleOpenToast = this.handleOpenToast.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        const canvas = document.querySelector('#board');
        this.ctx = canvas && canvas.getContext('2d');
        const ctx = this.ctx;

        const sketch = document.querySelector('#sketch');
        const sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        const mouse = { x: 0, y: 0 };
        const last_mouse = { x: 0, y: 0 };

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        const root = this;
        const onPaint = function () {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if (root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function () {
                const base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", base64ImageData);
            }, 1000)
        };
    }

    // exportImage() {
    //     const canvas = document.querySelector('#board');
    //     const base64ImageData = canvas.toDataURL("image/png");

    //     nftService.generateNFTProduct(base64ImageData).then(s => {
    //         console.log(s);
    //     })

    //     console.log(base64ImageData);
    // }


    handleOpen() {
        this.setState({
            openModal: true
        })
    }

    handleClose() {
        this.setState({
            openModal: false
        })
    }

    handleOpenToast() {
        this.setState({
            openToast: true
        })
    }

    handleCloseToast() {
        this.setState({
            openToast: false
        })
    }

    onChangeName(e) {
        this.setState({
            ...this.state,
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    submit() {
        const canvas = document.querySelector('#board');
        const base64ImageData = canvas.toDataURL("image/png");
        const name = this.state.name;
        const description = this.state.description;

        nftService.generateNFTProduct(base64ImageData, name, description).then(s => {
            if (s) {
                this.handleClose();
                this.handleOpenToast();
            }
        })
    }

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    action = (
        <React.Fragment>
          {/* <Button color="secondary" size="small" onClick={this.handleCloseToast}>
            UNDO
          </Button> */}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={this.handleCloseToast}
          >
          </IconButton>
        </React.Fragment>
      );

    render() {
        return (
            <div className="sketch" id="sketch" style={{ border: '2px solid #dadce0' }}>
                <div>
                    <canvas className="board" id="board"></canvas>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab variant="extended" onClick={this.handleOpen} style={{ zIndex: 'auto', marginTop: '-50px' }}>
                            <BackupIcon sx={{ mr: 1 }} />
                            Generate NFT Product
                        </Fab>
                        <Fab color="primary" variant="extended" style={{ zIndex: 'auto', marginTop: '-50px' }}>
                            <SaveIcon sx={{ mr: 1 }} />
                            Save
                        </Fab>
                    </Box>
                </div>
                <div>
                    <Modal
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={this.style}>
                        <FormGroup onSubmit={this.submit}>
                            <FormControl>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input id="name" aria-describedby="my-helper-text" onChange={this.onChangeName}/>
                            </FormControl>
                            <br/>
                            <FormControl>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input id="description" aria-describedby="my-helper-text" onChange={this.onChangeDescription}/>
                            </FormControl>
                            <Button className="mt-3" onClick={this.submit}>Submit</Button>
                        </FormGroup>
                    </Box>
                    </Modal>
                </div>
                <div>
                <Snackbar
                    open={this.state.openToast}
                    autoHideDuration={3000}
                    onClose={this.handleCloseToast}
                    message="Your item is publishing on Opensea. You will receive email when the action have done."
                    action={this.action}
                />
                </div>
            </div>
        )
    }
}

export default Board
