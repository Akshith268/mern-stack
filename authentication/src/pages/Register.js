
import {useState} from 'react';


function Register() {
 
  const[name,setname]=useState("");
  const[password,setpassword]=useState("");
  const[email,setemail]=useState("");
  const[confirmpassword,setconfirmpassword]=useState("");

  async function registeruser(e) {
    e.preventDefault();
  
    try {
      const result = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password,
          "confirmpassword": confirmpassword
        })
      });
  
      if (!result.ok) {
        throw new Error('Network response was not OK');
      }
  
      const data = await result.json();

      if(data.status==='ok')
      {
        window.location.href="/login";
      }

      console.warn("result", data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  

  return (
    <div className="App">

        <h1>Registration</h1>

          <form onSubmit={registeruser}>
            <label>Name: </label>
            <input value={name} onChange={(e)=>setname(e.target.value)} type="text" name="Name" />
            <br />
            <label> Email: </label>
            <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" name="email" />
            <br />
            <label> Password: </label>
            <input value={password} onChange={(e)=> setpassword(e.target.value)} type="password" name="password" />
            <br />
            <label> Confirm Password: </label>
            <input value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} type="password" name="confirmPassword" />
            <br />
            
            <input type="submit" value="Create User" />
          </form>
      </div>
  );
}

export default Register;

