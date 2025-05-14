"use client";

import API_BASE from "@/app/services/api";
import { propBandas, propEstilos } from "@/app/types/props";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Bandas = () =>{

    const params = useParams();
    const slugParams = params.slug;
    const isEdit = slugParams !== 'novo';
    const slug = isEdit ? slugParams : undefined;


    const [mensagem, setMensagem] = useState('');

    const [estilos, setEstilos] = useState<propEstilos[]>([]);
    const [formData, setFormData] = useState<propBandas>({
        id : '0',
        banda : '',
        integrantes : '',
        descricao : '',
        links : '',
        slug : '',
        imagem : '',
        categoria : '',
        exibir : '',
    });

    useEffect(() =>{
        fetch(`${ API_BASE }/estilo/Editar`)
        .then((res) => res.json())
        .then((data) => setEstilos(data))
        .catch(() => setMensagem('Erro ao carregar as categorias!'))

        if(isEdit && slug){
            fetch(`${ API_BASE }/bandas/editar/${slug}`)
            .then((res) => res.json())
            .then((data) =>{
                if(data && data.length > 0){
                    setFormData({
                        id : data[0].id,
                        banda : data[0].banda,
                        integrantes : data[0].integrantes,
                        descricao : data[0].descricao,
                        links : data[0].links,
                        slug : data[0].slug,
                        imagem : data[0].imagem,
                        categoria : String(data[0].categoria),
                        exibir : data[0].exibir,
                    })
                    console.log(data)
                }
            })
            .catch(()=> setMensagem('Erro ao carregar dados da banda'))
        }
    },[slug,isEdit])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value || '',
        })       
    }
    const handleSubmit = async( e : React.FormEvent) =>{
        e.preventDefault();

        const url = isEdit
            ? `${ API_BASE}/bandas/atualizar/${ formData.id }`
            : `${ API_BASE}/bandas/cadastrar`
        
        const method = isEdit
            ? 'PUT'
            : 'POST'
        
        try{
            const response = await fetch(url,{
                method,
                headers: {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(formData)
            });

            if(response.ok){
                setMensagem(isEdit ? 'Banda atualizada com sucesso!' : 'Banda cadastrada com suceso!');
                
                if(!isEdit){
                    setFormData({
                        id : '0',
                        banda : '',
                        integrantes : '',
                        descricao : '',
                        links : '',
                        slug : '',
                        imagem : '',
                        categoria : '',
                        exibir : '',
                    })
                }
            }
            else{
                const erro = await response.text();
                setMensagem(`Erro ao salvar:${ erro }`)
            }
        }
        catch(error){
            console.error(error)
        }

    }

    return(
        <>
            <h1>{ isEdit ? 'Editar Banda' : 'Cadastrar nova Banda'}</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="banda">Banda: </label>
                    <input 
                        name="banda"
                        id="banda"
                        value={ formData.banda }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="integrantes">Integrantes: </label>
                    <input 
                        name="integrantes"
                        id="integrantes"
                        value={ formData.integrantes }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição: </label>
                    <textarea 
                        name="descricao"
                        id="descricao"
                        value={ formData.descricao }
                        onChange={ handleChange }
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imagem">Imagem: </label>
                    <input 
                        name="imagem"
                        id="imagem"
                        value={ formData.imagem }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="categoria">Estilo Musical: </label>
                    <select
                        name="categoria"
                        id="categoria"
                        value={ formData.categoria || '' }
                        onChange={ handleChange }
                    >
                        <option value="">Selecione um Estilo Musical</option>
                        {
                            estilos.map((estilo) =>
                                <option key={estilo.id} value={ estilo.id }>{ estilo.estilo }</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="exibir">Exibir</label>
                    <select
                        name="exibir"
                        id="exibir"
                        value={ formData.exibir }
                        onChange={ handleChange }
                    >
                        <option value={ 1 }>Exibir</option>
                        <option value={ 0 }>Ocultar</option>
                    </select>
                </div>
                <input 
                    type="hidden"
                    name="id"
                    id="id"
                    value={ formData.id }
                    onChange={ handleChange }
                    readOnly
                />
                <button type="submit">{ isEdit ? 'Atualizar' : 'Cadastrar'}</button>
            </form>
             
        </>
    )
}

export default Bandas;