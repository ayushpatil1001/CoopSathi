import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Laws from './pages/Laws';
import Schemes from './pages/Schemes';
import Pacs from './pages/Pacs';
import Pmfby from './pages/Pmfby';
import Ombudsman from './pages/Ombudsman';
import Ncct from './pages/Ncct';
import Telemetry from './pages/Telemetry';
import Chat from './pages/Chat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="laws" element={<Laws />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="pacs" element={<Pacs />} />
          <Route path="pmfby" element={<Pmfby />} />
          <Route path="ombudsman" element={<Ombudsman />} />
          <Route path="ncct" element={<Ncct />} />
          <Route path="telemetry" element={<Telemetry />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
