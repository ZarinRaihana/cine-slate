import Container from '@mui/material/Container';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Movies from './components/pages/Movies';
import Search from './components/pages/Search';
import Trending from './components/pages/Trending';
import TvSeries from './components/pages/TvSeries';


function App() {
  return (
    <Router>
         <Header />
         <div className="App">
                <Container>
                    <Routes>
                        <Route  path = '/' element = { <Trending />} />
                        <Route  path = '/movies' element = { <Movies />} />
                        <Route  path = '/tvSeries' element = { <TvSeries />} />
                        <Route  path = '/search' element = {<Search />} />
                    </Routes>
               </Container>
        </div>
        <NavBar />
    </Router>
  );
}

export default App;
