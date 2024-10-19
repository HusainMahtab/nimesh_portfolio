import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import AboutMe from "./components/AboutMe"
import Projects from "./components/Projects"
import Experiance from "./components/Experiance"
import ContactMe from "./components/ContactMe"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import AdminPanel from "./components/AdminPanel"
import AllProjects from "./components/AllProjects"
import AllUsers from "./components/AllUsers"
import AllUsersMessage from "./components/AllUsersMessage"
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Context from "../context/index"
import { useEffect } from "react"
import axios from "axios"
function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('AccessToken');
       console.log("Tokens",token)
       if(!token){
        console.log("token is not found local storage")
       }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`,
        { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      dispatch(setUserDetails(response.data.data));
      //console.log("response",response)
    } catch (error) {
      console.log("error while fetching user details", error?.message);
    }
  };
  useEffect(() => {
     fetchUserDetails();
  }, []);
  return (
    <Context.Provider value={{fetchUserDetails}}>
      <Router>  
         <Header/>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<AboutMe/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/experiance" element={<Experiance/>}/>
            <Route path="/contact" element={<ContactMe/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/admin_panel" element={<AdminPanel/>}/>
            <Route path="/admin_panel" element={<AdminPanel/>}>
                <Route path="all_users" element={<AllUsers />} />
                <Route path="all_projects" element={<AllProjects/>} />
                <Route path='all_user_messages' element={<AllUsersMessage/>}/>
            </Route>    
         </Routes>
      </Router>
    </Context.Provider>
  )
}

export default App
