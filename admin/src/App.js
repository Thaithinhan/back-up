import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AdminPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/*" element={<AdminPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
