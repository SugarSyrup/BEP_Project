import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Ask from "./pages/Ask";
import AskDetail from "./pages/AskDetail";
import AskWrite from "./pages/AskWrite";
import AskModify from "./pages/AskModify";
import PageNotFounded from "./pages/PageNotFounded.js";

//Dev Branch
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Layout>
				<Routes>
					{/* 정책 소개 메인 페이지 */}
					<Route path="/" element={<Home />} />
					{/* 정책 소개 상세 페이지 */}
					<Route path="/detail/:id" element={<Detail />} />
					{/* 신문고 */}
					<Route path="/ask" element={<Ask />} />
					<Route path="/ask/:id" element={<AskDetail />} />
					<Route path="/ask/write" element={<AskWrite />} />
					<Route path="/ask/modify" element={<AskModify />} />
					{/*  */}
					<Route path="/*" element={<PageNotFounded />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	</React.StrictMode>
);
