import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Container from "react-bootstrap/Container";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Create from "./components/Create";
import MembersList from "./components/MembersList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container className="mt-5 p-5 mb-4 bg-light rounded-3">
        <Routes>
          <Route exact path="/" element={<MembersList />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
