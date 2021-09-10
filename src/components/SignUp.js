import React from 'react'

export const SignUp = ({setShowLogin}) => {

    /******************* 
    @Purpose : post method to send data api
    @Parameter : {}
    @Author : DARSH
    ******************/
    const sendDataToJson=(username,password)=>{

        let data= {username, password}

        fetch("http://localhost:3000/users",{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
            
        }).then((res)=>{
            console.log(res);
        })
    }

    /******************* 
    @Purpose : main signup handler
    @Parameter : {event}
    @Author : DARSH
    ******************/
    const formHandler=event=>{
        event.preventDefault();

        const {username, password}= event.target.elements;

        if(username.value.trim().length===0 || password.value.trim().length===0){
            return false
        }

        sendDataToJson(username.value, password.value);

        alert("Data Added into JSON");

        username.value=""
        password.value=""

    }

    return (
        <div>
            <h3>SignUp Form</h3>
            <form onSubmit={formHandler}>
                <input type="text" id="username" placeholder="Enter New UserName" /> <br /><br />
                <input type="password" id="password" placeholder="Create Password" /><br /><br />
                <input type="submit" value="Add" /> <br /><br />
                <h4 onClick={()=>{setShowLogin(true)}} >Already Signed up click Here for Login</h4>
            </form>
        </div>
    )
}
