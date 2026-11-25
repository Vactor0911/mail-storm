import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

const App = () => {
  return (
    <BrowserRouter basename="/mail-storm/">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
