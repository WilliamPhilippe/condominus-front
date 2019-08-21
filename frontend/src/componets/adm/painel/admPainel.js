import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import './admPainel.css';

export default function AdmPainel({ history, match }){

    var  random = 1;

    const { _id, user } = match.params;

    const [ flagListOwners, setFlagListOwners ] = useState(1);
    const [ flagListDoormans, setFlagListDoormans ] = useState(1);
    const [ flagListHouses, setFlagListHouses ] = useState(1);

    const [owners, setOwners] = useState([]);
    useEffect(() => {
        async function loadOwners(){
            const response = await api.get('/listOwners');

            setOwners(response.data);
        }

        loadOwners();
    }, [flagListOwners]);

    
    const [houses, setHouses] = useState([]);
    useEffect(() => {
        async function loadHouses(){
            const response = await api.get('/listHouses');

            setHouses(response.data);
        }

        loadHouses();

    },[flagListHouses]);

    const [doormans, setDoormans] = useState([]);
    useEffect(() => {
        async function loadDoormans(){
            const response = await api.get('/listDoormans'); 

            setDoormans(response.data);
        }

        loadDoormans();
    }, [flagListDoormans]);
    
    async function handleDeliteOwner(id){
        await api.post('/deliteOwner', { id });
        setFlagListOwners(++random);
    }

    async function handleDeliteHouse(id){
        await api.post('deliteHouse', { id });
        setFlagListHouses(++random);
    }

    async function handleDeliteDoorman(id){
        await api.post('deliteDoorman', { id });
        setFlagListDoormans(++random);
    }

    return (
        <div>
            <div id="userAdm">
                <h1 id="ola">{match.params.user}</h1>
                <button type="button" id="sair" onClick={e => history.push('/')}  >sair</button>
            </div>
            <div id="containerPainelAdm">
                <ul>
                    <ul id="moradores">
                        {owners.map(owner => (
                            <li key={owner._id}>
                                <h1>{owner.name}</h1>
                                <h2>Casa {owner.houseNumber} Bloco {owner.houseBlock}  |  {owner.user}</h2>
                                <div id="buttons">
                                    <button onClick={() => history.push(`/edit/owner/${owner._id}/${user}`)}>editar</button>
                                    <button onClick={() => handleDeliteOwner(owner._id)}>excluir</button>                                
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul id="casas">
                        {houses.map(house => (
                            <li key={house._id}>
                            <h1>Casa {house.number} Bloco {house.block}</h1>
                            <div id="buttons">
                                <button onClick={() => history.push(`/edit/house/${house._id}/${user}`)}>editar</button>
                                <button onClick={() => handleDeliteHouse(house._id)}>excluir</button>                                
                            </div>
                        </li>
                        ))}
                    </ul>
                    <ul id="funcionarios">
                        {doormans.map(doorman => (
                            <li key={doorman._id}>
                                <h1>{doorman.name}</h1>
                                <h2>{doorman.user}</h2>
                                <div id="buttons">
                                    <button onClick={() => history.push(`/edit/doorman/${doorman._id}/${user}`)}>editar</button>
                                    <button onClick={() => handleDeliteDoorman(doorman._id)}>excluir</button>                                
                                </div>
                            </li>
                        ))}
                    </ul>
                </ul>
                <div id="buttonsCreate">
                    <button id="owners" onClick={() => history.push(`/cadastrarOwner/${_id}/${user}`)}>Cadastrar</button>
                    <button id="houses" onClick={() => history.push(`/cadastrarHouse/${_id}/${user}`)}>Cadastrar</button>
                    <button id="doormans" onClick={() => history.push(`/cadastrarDoorman/${_id}/${user}`)}>Cadastrar</button>
                </div>
            </div>       
        </div> 
    );
}