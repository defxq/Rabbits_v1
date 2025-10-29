import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Public from "./pages/Public";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import LinksPage from "./pages/LinksPage";
import RequiredAuth from "./features/auth/RequiredAuth";
import AdminPage from "./pages/AdminPage";
import EditorPage from "./pages/EditorPage";
import Lounge from "./pages/Lounge";
import Missing from "./pages/Missing";
import Welcome from "./pages/Welcome";
import Unauthorized from "./pages/Unauthorized";
import General from "./pages/General";
import AboutMe from "./pages/AboutMe";
import NavBar from "./components/NavBar";
import PersistLogin from "./features/auth/PersistLogin";
import Homepage from "./pages/Homepage";

const ROLES_LIST = {
    User: 'USER',
    Editor: 'EDITOR',
    Admin: 'ADMIN', 
};

const App = () => {
  return (
    <main>
    <NavBar />
    <Routes>
        <Route path="/*" element={<Layout />}>
          {/* public routes */}
            <Route index element={<Homepage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="public" element={<Public />}/>
            <Route path="signup" element={<RegisterPage />}/>
            <Route path="links" element={<LinksPage />}/>
            <Route path="unauthorized" element={<Unauthorized />}/>
          {/* protected routes */}
          <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth allowedRoles={[ROLES_LIST.Admin]}/>}>
            <Route path="admin" element={<AdminPage />}/>
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ROLES_LIST.Editor]}/>}>
            <Route path="editor" element={<EditorPage />}/>
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]}/>}>
            <Route path="lounge" element={<Lounge />}/>
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor]}/>}>
            <Route path="welcome" element={<Welcome />}/>
            <Route path="general" element={<General />}/>
            <Route path="me" element={<AboutMe />}/>
          </Route>
          </Route>
          {/* Catch All routes */}
            <Route path="*" element={<Missing />}/>
        </Route>
    </Routes>
    </main>
  )
}
export default App;