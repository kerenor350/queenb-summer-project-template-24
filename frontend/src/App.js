import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages and components

import Home from './pages/Home'
import Navbar from './components/Navbar' 
import CreateAlbumPage from './pages/CreateAlbumPage'; 
import AlbumPage from './pages/AlbumPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums/new" element={<CreateAlbumPage />} />   {/* יצירת אלבום */}
            <Route path="/albums/:id" element={<AlbumPage />} />         {/* עמוד אלבום */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
