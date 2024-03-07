import Registerandloginform from "./Registerandloginform"
import {useContext} from "react"
import {UserContext} from "./UserContext"
import Chat from "./Chat";
export default function Routes() 
{
  let {username,id}=useContext(UserContext);
  if(username)
  return (<>
{"logged in! "+username}
  </>);
    return (<>
      <Registerandloginform/>
      </>
    )
  }