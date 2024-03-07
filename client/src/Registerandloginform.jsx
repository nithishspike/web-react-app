import { useState ,useContext} from "react";
import axios from "axios"
import {UserContext} from "./UserContext"
export default function Register(){
    let [user,newuser]=useState("");
    let [pass,newpass]=useState("");
    let [isLoginOrRegister, setIsLoginOrRegister] = useState('register')
    const {setUsername,setId}=useContext(UserContext)
    async function Registerandloginform(e){
      e.preventDefault();
      let url=isLoginOrRegister==='register' ?'register' :'login';
      console.log(url);
      const {data} = await axios.post(url, { user, pass });
      setUsername(user);
      setId(data.id);
      //console.log(data);
    }
    return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto" onSubmit={Registerandloginform}>
        <input value={user} onChange={e => newuser(e.target.value)} type="text" placeholder="username" className="block w-full ruounded-sm p-2 mb-2 border"/>
        <input value={pass} onChange={e => newpass(e.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"/>
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">{isLoginOrRegister==='register' ? 'Register' :'login'}</button>
        <div className="text-center mt-2">
        {isLoginOrRegister==='register' &&( <div> Already a member? 
        <button onClick={()=>setIsLoginOrRegister('login')} href="">Login here
        </button>
        </div>)}
        {isLoginOrRegister==='login' &&( <div> Dont have an account? 
        <button onClick={()=>setIsLoginOrRegister('register')} href="">Register here
        </button>
        </div>)}
        </div>     
      </form>
    </div>);

}