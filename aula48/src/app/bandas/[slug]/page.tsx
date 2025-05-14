"use client";

import API_BASE from "@/app/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { propBandas } from "@/app/types/props";
import Image from "next/image";

const Bandas = () => {

    const { slug } = useParams();
    const [bandas, setBandas] = useState<propBandas[]>([])

    useEffect(() => {
        const buscarBandas = async () => {
            try {
                const response = await fetch(`${API_BASE}/bandas/${slug}`);
                const data = await response.json();
                console.log(data)
                setBandas(data)
            }
            catch (error) {
                console.error(error)
            }
        }
        buscarBandas()

    }, [slug])

    return (
        <>
            <h1>Bandas</h1>
           {bandas.length > 0 && (
                <div>
                    <strong>Banda: </strong>{bandas[0].banda} <br />
                    <strong>Descrição: </strong>{bandas[0].descricao} <br />
                    {/* Corrigir a interpolação da imagem */}
                    <Image
                        src={`/imagens/${bandas[0].imagem}`}
                        alt={bandas[0].banda}
                        width={100}
                        height={100}
                    />
                </div>
            )}
        </>
    )
}
export default Bandas;