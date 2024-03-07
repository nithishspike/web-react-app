import {createContext,useState,useEffect} from "react";
import axios from "axios"
export const UserContext=createContext({});
export function UserContextProvider({children}){
    const [username,setUsername]=useState(null);
    const [id,setId]=useState(null);
    useEffect(()=>{
         axios.get("/profile").then(res=>{
            setId(res.data.userId);
            setUsername(res.data.username)
            console.log(res.data);
        })
    },[])
    // const fetchData  = async () => {
    //     try {
    //       const res = await axios.get("/start");
    //       console.log(res.data);
    //     } catch (error) {
    //       console.error("Error fetching profile data:", error);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchData();
    //   }, []);
    return(
        <UserContext.Provider value={{username , setUsername , id,setId }}>
        {children}
        </UserContext.Provider>
    )
}