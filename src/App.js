import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Fiction from './pages/fiction';
import NonFiction from './pages/non_fiction';
import Header from './pages/header';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <div style={{
        background: "rgb(250,250,250)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100%",
      }}>
        <div style={{
          background: "white",
          margin: "20px",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/fiction' element={<Fiction/>}/>
            <Route path='/nonfiction' element={<NonFiction/>}/>
          </Routes>

        </div>

      </div>
    </Router>
    </>
  );
}

export default App;
