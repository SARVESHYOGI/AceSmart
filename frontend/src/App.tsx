import { Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import StudentLayout from "./Layout/StudentLayout";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
