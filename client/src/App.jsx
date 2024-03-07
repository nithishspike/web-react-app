import axios from "axios"
import Routes from "./Routes"
import { UserContextProvider } from "./UserContext";
export default function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  //axios.defaults.withCredentials = true;
  
  return (<>
  <UserContextProvider>
    <Routes/>
  </UserContextProvider>
    </>
  )
}