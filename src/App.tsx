import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/home/screen';
import Router from './routes/Router';

function App() {
  return (
    <Router/>
  );
}

export default App;
