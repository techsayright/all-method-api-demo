import React, { useEffect, useState } from 'react'

export default function UpdatePassword({setIsUpdate}) {
    const [username , setUsername]= useState("")

    
    /******************* 
     @Purpose : get mathod for single data for update
     @Parameter : {}
     @Author : DARSH
     ******************/
    const fetchAData = async ()=>{
        let pathData = localStorage.getItem('auth');
        let res = await fetch(`http://localhost:3000/users/${pathData}`);
        res =await res.json()
        setUsername(res.username)
    }

    useEffect(()=>{
        fetchAData()
    },[])


    /******************* 
    @Purpose : submit handler
    @Parameter : {e}
    @Author : DARSH
    ******************/
    const updateAPI =upObj=>{
        let pathData = localStorage.getItem('auth');

        fetch(`http://localhost:3000/users/${pathData}`,{
            method:"PUT",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(upObj)
            
        }).then((res)=>{
            console.log(res);
        })
        
        setIsUpdate(false)
        
        alert("value updated!!")
    }

    /******************* 
    @Purpose : submit handler
    @Parameter : {e}
    @Author : DARSH
    ******************/
    const updatePassHandler=e=>{
        e.preventDefault()

        const {usernameUp, passwordUp}= e.target.elements;

        if(passwordUp.value.trim().length===0){
            return
        }

        const updatedObj = {
            username: usernameUp.value,
            password: passwordUp.value
        }

        updateAPI(updatedObj)

        console.log("updated");
    }

    return (
        <div>
            <h3>Update Your Password Here</h3>
            <form style={{backgroundColor: 'orange'}} onSubmit={updatePassHandler} >
                <input type="text" id="usernameUp" value={username}  placeholder="Your UserName" disabled/> <br /><br />
                <input type="password" id="passwordUp" placeholder="Set New Password" /><br /><br />
                <input type="submit" value="Update Password" /> &nbsp;
                <input type="button" value="close" onClick={()=>{setIsUpdate(false)}}/> &nbsp;
            </form>
        </div>
    )
}
