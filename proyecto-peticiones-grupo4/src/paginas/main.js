import React, { useState } from "react";
import "./main.css"
import img1 from "./icon.png"
import axios from "axios";
import Swal from 'sweetalert2';
const Main =() => {

    //Objeto que maneja peticion de problema del usuario
    const  [peticionReporte,setPeticionReporte]= useState("");
    /*Elemento de credenciales
    el usuario y contraseña se deben pasar a base64 para redmine (GTI_Grupo_4, gT1_gRupo04)*/
    const AuthorizationHeader = 'Basic R1RJX0dydXBvXzQ6Z1QxX2dSdXBvMDQ=';

    //Objeto de instancia de elementos para peticion
    const ClienteRedmine = axios.create({
        baseURL: 'https://npr3s.com/control/projects/gti-1265-1167',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': AuthorizationHeader
        }
    });

    //Funcion que maneja el envio de la peticion de reporte a redmine
    const envioPeticion_Reporte = async () => {

        if(peticionReporte.length === 0 || peticionReporte === ""){
            //No se ha ingresado un reporte
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'No se ingreso ningun reporte. Vuelva a intentar.',
              });
        } else {
            try {
                //Creacion de fecha para estar alineada con Redmine
                const fechaActual = new Date().toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).split('/').reverse().join('-');
                
                const cuerpoPeticion = {
                    issue: {
                        project_id: 19,
                        tracker_id: 1,
                        status_id: 1,
                        priority_id: 2,
                        subject: peticionReporte,
                        description: "Prueba desde aplicación React Grupo 4.",
                        start_date: fechaActual
                    }
                }
                //Peticion POST mediante axios hacia redmine
                const respuesta = await ClienteRedmine.post("/issues.json",cuerpoPeticion);
                if(respuesta.status === 201){
                    //Se creo exitosamente
                    Swal.fire({icon:'success', title:'Creación Exitosa', 
                    text: "Se creo un reporte sobre el problema exitosamente. "}).then(()=> setPeticionReporte(""));
                } else {
                    //Ocurrio un error
                    Swal.fire({icon:'error', title: 'Error', text:'Ocurrio un error al crear el reporte.'})
                }
                return true;
            } catch (error) {
                console.log(error);   
            }
        }
    }
  
    return (
        <div className="principal">
            <div className="cajaCentral">
                <h1 className = "text">Reportar problema</h1>
                <div>
                    <textarea   
                        type="text"  
                        className="entradaPeticion" 
                        placeholder="Ingrese reporte sobre problema"
                        onChange={(event) => setPeticionReporte(event.target.value)} 
                        value={peticionReporte} 
                    />
                    <img src={img1} alt="Logo reporte bugs" className = "image" />
                </div>
                <button className="Sendbt" type="button" onClick={envioPeticion_Reporte}>Enviar</button>
            </div>
        </div>
    )
}

export default Main;