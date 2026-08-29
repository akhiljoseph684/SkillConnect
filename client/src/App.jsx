import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Developers from "./pages/Developers";
import DeveloperDetails from "./pages/DeveloperDetails";

import Skills from "./pages/Skills";
import SkillDetails from "./pages/SkillDetails";

import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/developers" element={<Developers />} />

        <Route path="/developers/:id" element={<DeveloperDetails />} />

        <Route path="/skills" element={<Skills />} />

        <Route path="/skills/:id" element={<SkillDetails />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/search" element={<SearchResults />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
