import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllData from "./views/AllData";
import Detail from "./views/Detail";
import Edit from "./views/Edit";
import NotFound from "./views/NotFound";
import Post from "./views/Post";

function App() {
  return (
    <div className="App App-header">
      <Routes>
        <Route path="/" element={<AllData />} />
        <Route path="/post" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
