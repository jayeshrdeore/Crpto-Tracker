import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoardPage from './Pages/DashBoardPage';
import Compare from './Pages/Compare';
import Home from './Pages/Home';
import CoinPage from './Pages/Coin';
import axios from 'axios';
import { useEffect, useState } from 'react'
import WatchListPage from './Pages/watchlist';


function App() {

  var cursor;
  var cursorPointer;

  useEffect(() => {
    cursor = document.getElementById("cursor");
    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursor.style.left = e.clientX + "px"),
        (cursor.style.top = e.clientY + "px")
      );
    });
    cursorPointer = document.getElementById("cursor-pointer");
    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursorPointer.style.left = e.clientX + "px"),
        (cursorPointer.style.top = e.clientY + "px")
      );
    });

    document.body.addEventListener("mousedown", function (e) {
      return (
        (cursor.style.height = "0.5rem"),
        (cursor.style.width = "0.5rem"),
        (cursorPointer.style.height = "3rem"),
        (cursorPointer.style.width = "3rem")
      );
    });

    document.body.addEventListener("mouseup", function (e) {
      return (
        (cursor.style.height = "0.3rem"),
        (cursor.style.width = "0.3rem"),
        (cursorPointer.style.height = "2rem"),
        (cursorPointer.style.width = "2rem")
      );
    });
  }, []);
  

  return (
    <div>
      <div className="cursor" id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
      <p className='copyright' >© {new Date().getFullYear()} Jayesh Deore. Made for Learning Purpose.</p>
    </div>
  );
}

export default App;
