
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserGitRepos from "./components/UserGitRepos";
import { Provider } from 'react-redux';
import store from "./store";
import UserData from "./components/UserData";

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserGitRepos />} />
            <Route path="/repos" element={<UserData />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
