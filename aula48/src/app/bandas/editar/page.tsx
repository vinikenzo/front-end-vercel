"use client";

import Link from "next/link";
import API_BASE from "@/app/services/api";
import { propBandas } from "@/app/types/props";
import { useEffect, useState } from "react";
import { FaEdit as Edit, FaTrash as Trash } from "react-icons/fa";

const Bandas = () =>{

    const [bandas,setBandas] = useState<propBandas[]>([])

    useEffect(()=>{
        buscarBandas();
    },[]);

    const buscarBandas = async() =>{
        try{
            const response = await fetch(`${ API_BASE }/bandas/editar`);
            const data = await response.json();
            setBandas(data);
        }
        catch(error){
            console.error(error)
        }
    }

    const handleDelete = async (id : number) => {
        if(confirm("Tem certeza que deseja excluir?")){
            try{
                const response = await fetch(`${ API_BASE }/bandas/excluir/${ id }`,{
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
                if(response.ok){
                    alert("Registro excluído com sucesso!");
                    buscarBandas();
                }
                else{
                    const erroData = await response.json();
                    alert(`Erro ao excluir: ${ erroData.message  || 'Erro Desconhecido' }`);
                }
            }
            catch(error){
                console.error(error);
                alert('Erro na requisição.')
            }
        }
    }

    return(
        <>
            <h1>Bandas</h1>

            <p>
                <Link href="cadastrar/novo">Cadastrar nova Banda</Link>
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Banda</th>
                        <th colSpan={ 2 }>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bandas.map((banda,index)=>
                            <tr key={index}>
                                <td>
                                    {banda.banda}
                                </td>
                                <td>
                                    <Link href={`cadastrar/${ banda.slug }`}>
                                        <button><Edit /></button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={()=> handleDelete(Number(banda.id))} disabled={Number(banda.exibir) === 0}><Trash /></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <ul>
                
            </ul>
        </>
    )
}
export default Bandas;