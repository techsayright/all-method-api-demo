import React from 'react'
import { useState } from 'react/cjs/react.development'
import styled from 'styled-components'
import UpdatePassword from './UpdatePassword'

const Button = styled.button`
    background-color:${props => props.delete ? 'red' : 'blue' };
    border: 1px solid black;
    padding: 1rem 1rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 700;

    &:hover{
        background-color: ${props => props.update ? 'red' : '#0000ffae'};
    }
`

export default function Home({setShowLogin ,setShowHome}) {

    const [isUpdate, setIsUpdate] = useState(false)
    
    /******************* 
    @Purpose : button handler
    @Parameter : {}
    @Author : DARSH
    ******************/
    const btnHandler =()=>{
        setShowLogin(true)
        setShowHome(false)

        localStorage.removeItem('auth')
    }

    /******************* 
    @Purpose : delete mathod api call
    @Parameter : {}
    @Author : DARSH
    ******************/
    const deleteBtnHandler=async()=>{
        let pathVal = localStorage.getItem('auth')
        await fetch(`http://localhost:3000/users/${pathVal}`,{
            method:"DELETE"
        })

        alert("You are now removed from our db");

        btnHandler()
    }

    return (
        <div>
            <h1>Hello, User</h1>
            <Button onClick={btnHandler}>Logout</Button> &nbsp;
            <Button delete  onClick={deleteBtnHandler}>Delete My Account</Button> <br /><br />
            <Button update onClick={()=>setIsUpdate(true)}>Update my Password</Button>

            {isUpdate && <UpdatePassword setIsUpdate={setIsUpdate}/>}
        </div>
    )
}
