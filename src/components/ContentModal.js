import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useState } from 'react';
import { unavailable } from '../config/config';
import classes from '../styles/Content.module.css';

const style = {
    position: 'absolute',
    display:'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '80%',
    width: '90%',
    bgcolor: 'black',
    color: 'white',
    border: '2px solid #fff',
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };

const ContentModal = ({mediaType, id, children}) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState()
    const handleOpen = () => {setOpen(true); fetchData()}
    const handleClose = () => setOpen(false);


   // useEffect(() => {
        const fetchData = async () => {

            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`);

                setContent(data.results);
                setVideo(data.videos.results[0]);
                console.log(data);
                console.log(data.videos.results[0]?.key)
                console.log(content);

            } catch (error) {
                console.log(`There was an Error!`)
            }
        }
    //     fetchData();
    //     return () => {
            
    //     }
    // }, [id])
  
    return (
      <div>
        <Button className={classes.media} onClick={handleOpen} >{children}</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>

            <Box sx={style}>
                {3 + 5}
                  <h1>hi</h1>
                  <img src={unavailable} alt = 'no'  />
                  {console.log(content)}
              {/* {content && <img src={content.poster_path} alt = 'no' /> && <span>helo</span>}
                  {content && console.log(content.poster_path)}  */}
                    {/* (<img src={content.poster_path ? `${img_300}/${content.poster_path}` : unavailable} alt = 'content' />) */}
              
             </Box>
             
          </Fade>
        </Modal>
      </div>
    );
  }

export default ContentModal
