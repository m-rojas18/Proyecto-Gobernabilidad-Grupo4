import React, { useState } from "react";
import "./main.css"

const Main =() => {

    const  [peticionReporte,setpeticionReporte]= useState("");

    const envioPeticion_Reporte = () => {
        console.log("Se envio la peticion"+ peticionReporte);
    }
    return (
        <div className="principal">
            <div className="cajaCentral">
                <h1>Reportar problema</h1>
                <textarea  type="text"   width= "100%" className="entradaPeticion" placeholder="Ingrese reporte sobre problema"
                    onChange={(event) => setpeticionReporte(event.target.value)}/>
                <button className="Sendbt" type="button" onClick={envioPeticion_Reporte}>Enviar</button>
            </div>
        </div>
        
    )
}

export default Main;