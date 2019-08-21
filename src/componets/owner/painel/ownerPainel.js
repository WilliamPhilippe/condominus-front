import React, {useState, useEffect} from 'react';

import api from '../../../services/api';

import './owner.css'

export default function OwnerPainel({ history, match }){

    const { _id, user } = match.params;

    const [ newButton, setNewButton ] = useState('');
    const [ infoText, setInfoText ] = useState('');
    const [plaque, setPlaque ] = useState('');
    
    async function handleSubmitVeichle(e){
        e.preventDefault();

        const response = await api.post('/verifyVeichle', { plaque });

        if(response.data.newStatus === 200){
            if(response.data.veichleExists.status){
                setInfoText(
                    <h2>veículo autorizado</h2>
                );
                setNewButton(
                    <button type="button" id="details"
                            onClick={() => history.push(`/edit/Veichle/${plaque}/${user}`)}
                    >Editar</button>
                );
            }
            else{
                setInfoText(
                    <h1>veículo não autorizado</h1>
                );
                setNewButton(
                    <button type="button" id="details"
                            onClick={() => history.push(`/edit/Veichle/${plaque}/${user}`)}
                    >Editar</button>
                );
            }
        }
        else {
            setInfoText(
                <h1>veículo não cadastrado</h1>
            );
            setNewButton(
                <button type="button" id="details"
                        onClick={() => history.push(`/create/Veichle/${plaque}/${user}`)}
                >Cadastrar</button>
            );
        }
    }

    
    
    return (
        
        <div id="userOwner">
            <div id="userAdm">
                <h1 id="ola">{match.params.user}</h1>
                <button type="button" id="sair" onClick={e => history.push('/')}  >sair</button>
            </div>
            <button id="owneredit" onClick={() => history.push(`/edit/owner/${_id}/${user}`)}>editar dados</button>
            <div id="veichlesowner">
                <form onSubmit={handleSubmitVeichle}>
                    <input placeholder="Digite a placa" value={plaque} onChange={e => setPlaque(e.target.value)}/>
                    <div id="buttons">
                        <button type="submit" id="findVeichles">Verificar</button>
                        {newButton}                    
                    </div>
                </form>
                {infoText}
            </div>
        </div>
   );
};