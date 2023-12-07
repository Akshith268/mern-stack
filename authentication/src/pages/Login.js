
import {useState} from 'react';



function Login() {
 
  const[password,setpassword]=useState("");
  const[email,setemail]=useState("");

  async function loginuser(e) {
    e.preventDefault();

      const result = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        })
      });
  
    
  
      const data = await result.json();
       if(data.status=='ok')
       {
          alert("Login Successfull");
          window.location.href="/home";
       }
       else
       {
         alert("Invalid Credentia");
       }
  }
  

  return (
    <div className="App">

        <h1>Login</h1>

          <form onSubmit={loginuser}>
            <label> Email: </label>
            <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" name="email" />
            <br />
            <label> Password: </label>
            <input value={password} onChange={(e)=> setpassword(e.target.value)} type="password" name="password" />
            <br />
            <input type="submit" value="Login" />
          </form>
      </div>
  );
}

export default Login;
