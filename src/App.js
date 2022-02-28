import React, { useState } from "react";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./components/Navbar/Nav.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import "./main.css";
import PostCard from "./components/Post/PostCard.jsx";
import Redirect from "./components/Error/Error.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [display, setDisplay] = useState(false);
  const [comments, setComments] = useState([]);;
  return (
    <BrowserRouter>
      <Nav LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
      <div className="App">
        <Routes>
          <Route
            path="/register"
            element={<Register LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/"
            element={<Login LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/home"
            element={
              <PostCard
                display={display}
                setDisplay={setDisplay}
                posts={posts}
                setPosts={setPosts}
                LoggedIn={LoggedIn}
                setLoggedIn={setLoggedIn}
                comments={comments}
                setComments={setComments}
              />
            }
          />
          <Route path="" element={<Redirect />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
