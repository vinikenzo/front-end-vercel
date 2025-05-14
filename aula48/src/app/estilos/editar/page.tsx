'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit as Edit, FaTrash as Trash } from "react-icons/fa";
import { propEstilos } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const Estilo = () =>{

    const [estilos,setEstilos] = useState<propEstilos[]>([])

    
        const buscarEstilos = async() =>{
            try{
                const response = await fetch(`${ API_BASE }/estilo/Editar`);
                const data = await response.json();
                setEstilos(data);
            }
            catch(error){
                console.log(error)
            }
        }
        

    const handleDelete = async (id : string) =>{
        if(confirm("Tem certeza que deseja exluir?")){
            try{
                const response = await fetch(`${ API_BASE }/estilo/excluir/${ id }`,{
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
                if(response.ok){
                    alert("Registro excluído com sucesso!");
                    buscarEstilos();
                }
                else{
                    const errorData = await response.json();
                    alert(`Erro ao excluir, ${errorData.message || "Erro"}`)
                }
            }
            catch(error){
                console.error(error);
            }
        }
    }
    useEffect(()=>{
        buscarEstilos();
    },[])
    return(
        <>
            <h1>Editar Estilos Musicais</h1>

            <Link href="/estilos/cadastrar/novo">Cadastrar novo Estilo</Link>

            <table>
                <thead>
                    <tr>
                        <th>Estilo</th>
                        <th colSpan={ 2 }>Ação</th>
                    </tr>
                </thead>
                <tbody>
                {
                    estilos.map((estilo,index) => 
                        <tr key={ index }>
                            <td>{ estilo.estilo }</td>
                            <td>
                                <Link href={`cadastrar/${estilo.links}`}>
                                    <button ><Edit /></button>
                                </Link>
                            </td>
                            <td><button onClick={() =>{ handleDelete(String(estilo.id)) }} disabled={Number(estilo.exibir) === 0 }><Trash /></button></td>
                        </tr>
                        
                    )
                }
                </tbody>
            </table>
        </>
    )
}
export default Estilo;