import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		alert("Hoy no estoy inspirado");
	},[store.auth])

	return (
		<div className="text-center mt-5">
			{store.auth?<h1>Estas logeado</h1>:<h1>No estas logeado</h1>}
		</div>
	);
};
