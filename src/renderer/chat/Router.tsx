import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Components from './components';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Components.GetMessages />} />
        <Route path="/getraw" element={<Components.GetRawMessages />} />
        <Route path="/sendraw" element={<Components.SendRawMessages />} />
        <Route path="/send" element={<Components.SendMessages />} />
        <Route path="*" element={<Components.FourOhFour />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
