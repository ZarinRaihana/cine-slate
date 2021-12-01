import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styles from "../../styles/Trending.module.css";
import Content from '../Content';
import CustomPagination from '../CustomPagination';


const useStyles = makeStyles({
    textField:{
        width: '90%',
    },
     button:{
         marginLeft: '10px',
     },
     container:{
         display: 'flex',
         margin: '30px 0',
     },
     tab:{
        width: '50%',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    }
});

function Search() {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [contents, setContents] = useState([]);
    const [numOfPages, setNumOfPages] = useState(); 

    const classes = useStyles();

    window.scroll(0,0);

    //  fetching search query
const fetchSearch = useCallback(
        async () =>{ 
            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&query=${searchText}&include_adult=false`);

                setContents(data.results);
                setNumOfPages(data.total_pages);
        
                // console.log(data);
            } catch (error) {
                    console.log('There is an Error..!');
            }
        }   

    ,[page, searchText, type],
)

    // useEffect(() => {
    //     window.scroll(0, 0);
    
    //     fetchSearch();
    //     return () => {
    //         setContents([]);
    //     }
    // }, [fetchSearch])
    

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
            <Tabs value={type} 
                    onChange={(e, value) =>{ 
                        setType(value);
                        setPage(1) 
                        }} 
                    indicatorColor='primary' 
                    textColor='primary' >
                        <Tab className={classes.tab} 
                            label ="Search Movies" 
                            onClick={(e) =>{ 
                                setSearchText(""); 
                                setContents(); 
                                setNumOfPages(); 
                                }}
                        ></Tab>
                        <Tab className={classes.tab} 
                            label ="Search Tv Series"
                            onClick={(e) =>{ 
                                setSearchText(""); 
                                setContents(); 
                                setNumOfPages(); 
                                }}
                        ></Tab>
                </Tabs>
                
                <div className={classes.container}>
                        <TextField 
                            className={classes.textField} 
                            id="outlined-basic" 
                            label="Search" 
                            variant="outlined"  
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button 
                            className={classes.button} 
                            variant="contained" 
                            onClick={fetchSearch} >
                                <SearchIcon />
                        </Button>
                </div>             

            </ThemeProvider>

            <div className={styles.trending}>
                {contents && contents.map(content => (
                        <Content id={content.id}
                                        mediaType ={type ? 'tv' : "movie"}
                                        title={content.name || content.title} 
                                        poster={content.poster_path} 
                                        date={content.first_air_date || content.release_date}
                                        voteAvg={content.vote_average}  
                                        key={content.id} />
                )) }

            {/* {searchText &&
                   !contents &&
                   (type?`No Tv Series Found`:`No Movies Found` )} */}          

            </div>

            {numOfPages > 1 && 
                    <CustomPagination setPage = {setPage} numOfPages = {numOfPages} />
            }
        </div>
    )
}

export default Search
