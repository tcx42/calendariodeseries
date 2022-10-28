import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Calendar from './routes/Calendar';
import Header from './components/Header';
import Browse from './routes/Browse';
import MovieDetails from './routes/MovieDetails';
import TvshowDetails from './routes/TvshowDetails';
import Configuration from './interfaces/Configuration';

function App() {
  const [configuration, setConfiguration] = useState<Configuration>({});
  useEffect(() => {
    (async () => {
      setConfiguration(await (await fetch('http://localhost:4000/configuration')).json());
    })();
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes>
            <Route path='/' element={<Calendar />} />
            <Route path='/browse' element={<Browse configuration={configuration} />} />
            <Route path='/mediaDetails/movie' element={<MovieDetails configuration={configuration} />} />
            <Route path='/mediaDetails/tv' element={<TvshowDetails configuration={configuration} />} />
          </Routes>
        </div>
        <footer></footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
