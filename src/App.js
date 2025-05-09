import './App.css';
import ListUser from './User/ListUser';
import DetailUser from './User/DetailUser';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<ListUser />} />
          <Route path="/user/:id" element={<DetailUser />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;