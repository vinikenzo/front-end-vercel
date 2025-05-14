"use client";

import Link from "next/link";
import API_BASE from "../services/api";
import { propBandas } from "../types/props";
import { useEffect, useState } from "react";

const Bandas = () =>{

    const [bandas,setBandas] = useState<propBandas[]>([])

    useEffect(()=>{
        const buscarBandas = async() =>{
            try{
                const response = await fetch(`${ API_BASE }/bandas`);
                const data = await response.json();
                setBandas(data);
            }
            catch(error){
                console.error(error)
            }
        }
        buscarBandas();
    },[])

    return(
        <>
            <h1>Bandas Cadastradas</h1>
            <p>
                <Link href="/bandas/editar/">Editar Bandas - Visão do ADMIN</Link>
            </p>
            <ul>
                {
                    bandas.map((banda,index)=>
                        <li key={index}>
                            <Link href={`/bandas/${ banda.slug }`}>{banda.banda}</Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}
export default Bandas;