import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Pages - Components
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Nav/Navbar';

//route des pages présente sur le site
const index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
