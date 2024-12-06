import './frontPage.css';
import React, { useState } from "react";

export default function SignUpForm({ setToken }) 
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) 
    {
        event.preventDefault();
        setError(null); 

        if (username.length < 8) 
        {
            setError("The username must be at least 8 characters long.");
            return; 
        }

        try 
        {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
             });

        const result = await response.json();
        setToken(result.token);
        console.log(result.token);
    } 
    catch (error) 
    {
      setError(error.message);
    }
  }

  return (
    <div className = "divBox">
        <h2 className = "mainHeader">Sign Up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
              <label>
                  Username:
                  <input value={username} onChange={(e) => setUsername(e.target.value)}/><br />
              </label>
              <label>
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
              </label>
              <button className = "buttonStyle">Submit</button>
        </form>
    </div>);
}
