import './App.css';
import MovieData from './MovieData/MovieData';
import Search from './Search/Search';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
        <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieData />} />
        </Routes>
    </Router>
   </div>
  )
}
export default App;
