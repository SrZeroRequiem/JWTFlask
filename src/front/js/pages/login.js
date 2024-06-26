import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(email
            , password)
        let logged = await actions.login(email, password).then((res) => {
            if (res) {
                navigate('/')
            }else {
                alert("No te has logueado correctamente")
            }
        })
        setEmail("")
        setPassword("")
    }

	return (	
        <form onSubmit={handleSubmit} className="w-25" style={{margin: "50px auto"}}>
            <h1 className="text-center">Hola</h1>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input type="email" value={email} className="form-control" id="inputEmail3" onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input type="password" value={password} className="form-control" id="inputPassword3" onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
	);
};
