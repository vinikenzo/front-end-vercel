"use client";
import API_BASE from "@/app/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const Estilo = () =>{

    const params = useParams();
    const linksParams = params.links
    const isEdit = linksParams !== 'novo';
    const links = isEdit ? String(linksParams) : undefined;

    const [formData, setFormData] = useState({
        id : 0,
        estilo : '',
        links : '',
        exibir : 1
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() =>{
        if(isEdit && links){
            fetch(`${ API_BASE }/estilo/${ links }`)
            .then(res =>{
                if(!res.ok) throw new Error("Estilo não encontrado");
                return res.json(); 
            })
            .then(data =>{
                setFormData({
                    id : data.id,
                    estilo : data.estilo,
                    links : data.links,
                    exibir : data.exibir

                });
            })
            .catch(()=> setMensagem("Erro ao carregar o estilo"))
        }
    }, [links, isEdit])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.name === 'exibir' ? Number(e.target.value) : e.target.value
        });
    };

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();

        const url = isEdit
            ? `${ API_BASE }/estilo/${ links }`
            : `${ API_BASE }/estilo/`

            const method = isEdit ? 'PUT' : 'POST';

            try{
                const response = await fetch(url,{
                    method,
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(formData)
                });

                if(response.ok){
                    setMensagem(isEdit ? 'Estilo foi atualizado com sucesso!' : 'Estilo cadastrado com sucesso!')
                    if(!isEdit){
                        setFormData({
                            id : 0,
                            estilo : '',
                            links : '',
                            exibir : 1})
                    }
                }
                else{
                    const erro = await response.text();
                    setMensagem(`Erro ao salvar:  ${ erro }`);
                }
            }
            catch(error){
                console.error(error);
                setMensagem(`Erro na requisição: ${error}`)
            }
    }

    return(
        <>
            <h1>{ isEdit ? 'Atualizar o Estilo' : 'Cadastrar novo Estilo' }</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="estilo">Estilo: </label>
                    <input 
                        type="text"
                        name="estilo"
                        id="estilo"
                        value={ formData.estilo }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="exibir">Exibir: </label>
                    <select 
                        name="exibir"
                        id="exibir"
                        value={ formData.exibir }
                        onChange={ handleChange }
                    >
                        <option value="1">Exibir</option>
                        <option value="0">Ocultar</option>
                    </select>
                </div>
                <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={ formData.id }
                />
                <button type="submit">{ isEdit ? 'Atualizar' : 'Cadastrar'}</button>
            </form>
            { mensagem && <p>{ mensagem }</p>}
        </>
    )
}
export default Estilo;