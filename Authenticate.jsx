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
      setSuccessMessage(result.mes