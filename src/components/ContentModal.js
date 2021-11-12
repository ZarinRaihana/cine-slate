import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
import classes from '../styles/Content.module.css';
import styles from "../styles/ContentModal.module.css";
import Carousell from "./Carousell";

const style = {
    position: 'absolute',
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
  const button = {
      width: '100%',
      backgroundColor: 'rgb(221, 6, 6)',
    
  }

const ContentModal = ({mediaType, id, children}) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState()
    const handleOpen = () => {setOpen(true); fetchData()}
    const handleClose = () => setOpen(false);


   // useEffect(() => {
        const fetchData = async () => {

            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType === 'tv' ? 'tv' : 'movie'}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`);

                setContent(data);
                setVideo(data.videos.results[0].key);
                 console.log(data);
                // console.log(data.videos.results[0]?.key)
                // console.log(content);
                // console.log(data.poster_path);

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
        <div className={classes.media} onClick={handleOpen} >{children}</div>
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

            {content && 
            <Box sx={style}>
                <div className={styles.modalDiv}>
                    <img className={styles.portrait} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt = {content.name || content.title} /> 
             

                    <img className={styles.landscape} src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt = {content.name || content.title} /> 

                    <div className={styles.about}>
                      <span className={styles.title}><b>{content.title || content.name} ({
                        (content.release_date || content.first_air_date || "....").substr(0, 4)
                      }) </b></span>
                      
                      {content.tagline && (
                        <i className={styles.tagline}>{content.tagline}</i>
                      )}

                      <p className={styles.overview}>{content.overview}</p>
                      <div>
                        <Carousell mediaType={mediaType} id={id}/>
                        <Button sx={button} variant="contained" target='_blank'
                        href={`http://www.youtube.com/watch?v=${video}`} >▶ Watch Trailer</Button>
                      </div>
                    </div>
                        </div>
             </Box>
}
             
          </Fade>
        </Modal>
      </div>
    );
  }

export default ContentModal
