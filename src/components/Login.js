import React, { useEffect, useState } from 'react'
import './css/Form.css'

export default function Login({setShowLogin, setShowHome}) {

    const [data ,setData] = useState()
    const [isUsernameExist, setIsUsernameExist]= useState(false)

    /******************* 
    @Purpose : get method api call
    @Parameter : {}
    @Author : DARSH
    ******************/
    const fetchData =async()=>{
        let response = await fetch("http://localhost:3000/users")
        response =await response.json()
        setData(response)
    }

    useEffect(()=>{
        fetchData()
    }, [])

    /******************* 
    @Purpose : username Exist or not Checker
    @Parameter : {}
    @Author : DARSH
    ******************/
    const userExist = e=>{
        
        let isExist =false
        data.forEach((value)=>{
            if(e.target.value===value.username){
                isExist=true
            }
            if(isExist){
                setIsUsernameExist(true)
                console.log("exist");
                return
            }
            else{
                setIsUsernameExist(false)
                console.log("not");
                isExist=false
            }
        })

    }
    
    

    /******************* 
    @Purpose : main login handler
    @Parameter : {}
    @Author : DARSH
    ******************/
    const onLogin=e=>{

        e.preventDefault()

        const {usernameLg,passwordLg} = e.target.elements;

        let isAuth =false
        data.forEach((val)=>{
            if(usernameLg.value===val.username && passwordLg.value===val.password){
                isAuth=true
                setShowLogin(false)
                setShowHome(true)

                localStorage.setItem("auth", val.id );
            }
            if(isAuth){
                return
            }
            else{
                isAuth=false
            }
        })

        if(isAuth){
            console.log("authenticated");

        }else{
            console.log("fake user");
        }

    }

    return (
        <div>
            <h3>Login Here</h3>
            <form style={{backgroundColor: 'pink'}} onSubmit={onLogin}>
                <h2>{isUsernameExist ? 'This Username is already exist...please! enter another' : 'username should be unique'}</h2>
                <input type="text" id="usernameLg" placeholder="Your UserName" onBlur={userExist}/><br /><br />
                <input type="password" id="passwordLg" placeholder="Your Password" /><br /><br />
                <input type="submit" value="Login" disabled={isUsernameExist} /> <br /><br />
                <h4 onClick={()=>{setShowLogin(false)}} >not Signup yet Click here</h4>
            </form>
        </div>
    )
}
