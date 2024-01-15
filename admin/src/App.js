import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Overview from "./pages/package/Overview";
import CreatePackage from "./pages/package/CreatePackage";
import Unuploadedpackages from "./pages/package/Unuploadedpackages";
import Package from "./pages/package/Package";
import { Notification } from "./components/Notification";
import { useContext } from "react";
import PrivateRoutes from "./PrivateRoutes";
import Sections from "./pages/package/Sections";
import SectionDetails from "./pages/package/SectionDetails";
import Reviews from "./pages/reviews/Reviews";
import CreateReview from "./pages/reviews/CreateReview";
import UpdateReview from "./pages/reviews/UpdateReview";


function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
<>   
    <Notification />

    <Routes>
        <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/" exact/>
                <Route path="/package" >
                  <Route path="overview" element={<Overview />} />
                  <Route path="unuploadedpackages" element={<Unuploadedpackages />} />
                  <Route path="createpackage" element={<CreatePackage />} />
                  <Route path=":id" element={<Package />} />
                  <Route path="sections" element={<Sections />} />
                  <Route path="sections/:id" element={<SectionDetails />} />



                </Route>
                <Route path="/reviews">

                  <Route index element={<Reviews />} />
                  <Route path="new" element={<CreateReview />} />
                  <Route path="update/:id" element={<UpdateReview />} />
                </Route>
            </Route>

        
        <Route element={<Login/>} path="/login"/>
      </Routes>
</>
  );
}

export default App;
