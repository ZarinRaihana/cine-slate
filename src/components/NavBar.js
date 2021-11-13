import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 100,
        //  '&.css-16lloyr-MuiBottomNavigation-root' :{
        //   backgroundColor: '#000',
        // }
     },
    
});
const darkTheme = createTheme({
  palette: {
      mode: "dark",
  }
});

function NavBar() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const navigate = useNavigate();     // instead of useHistory

    //   navigate
    useEffect(() => {
        if (value === 0) 
            navigate('/');
        else if (value === 1) 
          navigate('/movies');
        else if (value === 2) 
          navigate('/tvSeries');
        else if (value === 3) 
          navigate('/search');
    }, [navigate, value])

  return (
    <ThemeProvider theme={darkTheme}>
      <BottomNavigation className = {classes.root }
                                      showLabels
                                      value={value}
                                      onChange={(event, newValue) => {
                                                          setValue(newValue);
                                        }}>
      
          <BottomNavigationAction style={{color: 'white'}} label="Trending" icon={<WhatshotIcon />} />
          <BottomNavigationAction style={{color: 'white'}} label="Movies" icon={<MovieIcon />} />
          <BottomNavigationAction style={{color: 'white'}} label="Tv Series" icon={<TvIcon />} />
          <BottomNavigationAction style={{color: 'white'}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </ThemeProvider>
  );
}
export default NavBar
