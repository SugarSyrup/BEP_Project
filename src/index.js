import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Ask from './pages/Ask';

//Dev Branch
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 정책 소개 메인 페이지 */}
          <Route path="/" element={<Home />} />
          {/* 정책 소개 상세 페이지 */}
          <Route path="/:id" element={<Detail />} />
          {/* 신문고 */}
          <Route path="/ask" element={<Ask />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
