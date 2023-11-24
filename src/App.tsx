import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import Form from "./components/Form/Form";
import Repositories from "./components/Repositories/Repositories";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/repositories" element={<Repositories />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
