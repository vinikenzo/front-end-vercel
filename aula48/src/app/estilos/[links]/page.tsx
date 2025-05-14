'use client';
import { useParams } from "next/navigation";
import { propAlbuns } from "@/app/types/props";
import { useEffect, useState } from "react";
import API_BASE from "@/app/services/api";

const Estilos = () =>{

    const links = useParams();

    const [albuns, setAlbuns] = useState<propAlbuns[]>([]);

    useEffect(()=>{
        const buscarAlbuns = async () => {
            try{
                const response = await fetch(`${ API_BASE }/album/buscarporcategoria/${ links.links }`);
                
                const data = await response.json();
                setAlbuns(data);
            }
            catch(erro){
                console.error(erro)
            }
        }
        buscarAlbuns()
    },[links?.links])

    if(albuns.length === 0){
        return(
            <>
                <h1>Busca por estilo</h1>
                <h2>Não existem álbuns para a categoria/estilo musical selecionado!</h2>
            </>
        )
    }

    return(
        <>
            <h1>Estilo - { albuns[0].nomeEstilo } </h1>
            <ul>
                {
                    albuns.map((album,index) =>
                        <li key={index}>
                            {album.album}
                        </li>
                    )
                }
            </ul>
        </>
    )
}
export default Estilos