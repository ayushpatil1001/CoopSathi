import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Primary Pages */}
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

          {/* Statutory Policies & GIGW Compliance Routes */}
          <Route path="privacy" element={<Policies />} />
          <Route path="terms" element={<Policies />} />
          <Route path="copyright" element={<Policies />} />
          <Route path="hyperlink" element={<Policies />} />
          <Route path="accessibility" element={<Policies />} />
          <Route path="disclaimer" element={<Policies />} />
          <Route path="sitemap" element={<Policies />} />

          {/* Clean Aliases & Legacy Link Fallbacks */}
          <Route path="mscs" element={<Navigate to="/laws" replace />} />
          <Route path="election" element={<Navigate to="/laws" replace />} />
          <Route path="circulars" element={<Navigate to="/laws" replace />} />
          <Route path="bylaws" element={<Navigate to="/laws" replace />} />
          <Route path="kcc" element={<Navigate to="/schemes" replace />} />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
