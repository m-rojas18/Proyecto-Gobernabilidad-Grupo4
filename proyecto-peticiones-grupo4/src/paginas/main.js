import React, { useState } from "react";
import "./main.css"
import img1 from "./icon.png"

const Main =() => {

    const  [peticionReporte,setpeticionReporte]= useState("");
    

   

    const envioPeticion_Reporte = () => {
        console.log("Se envio la peticion: "+ peticionReporte);
       
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
                                onChange={(event) => setpeticionReporte(event.target.value)} 

                                
                    />
                    <img src={img1} className = "image" />
                </div>
                <button className="Sendbt" type="button" onClick={() =>setpeticionReporte("")}>Enviar</button>
                
               
            </div>
        </div>
        
       
        
    )
}

export default Main;