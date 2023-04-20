import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Components from './components';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Components.Home />} />
        <Route path="/debug" element={<Components.Debug />} />
        <Route path="/update" element={<Components.Update />} />
        <Route path="*" element={<Components.FourOhFour />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
