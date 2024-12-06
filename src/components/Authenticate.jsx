import './frontPage.css';
import React, { useState } from "react";

export default function Authenticate({ token }) 
{
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() 
  {
    if (!token) 
    {
      setError("No token found. Please sign up first.");
      return;
    }

    setError(null); 
    setSuccessMessage(null); 
    setUsername(null);

    try 
    {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
            method: "GET",
            headers: 
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
      );
      
      const result = await response.json();
      setSuccessMessage(result.message);
      console.log(result.message);

      setUsername(result.data.username);
      console.log(result.message.username);

    } 
    catch (error)
    {
      setError(error.message);
    }
  }

  return (
    <div className = "divBox">
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button className = "buttonStyle2" onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
