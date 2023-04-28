import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Components from './components';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Components.Home />} />
        <Route path="/update" element={<Components.Update />} />
        <Route path="/accounts" element={<Components.Account />} />
        <Route path="/sockets" element={<Components.Socket />} />
        <Route path="*" element={<Components.FourOhFour />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
