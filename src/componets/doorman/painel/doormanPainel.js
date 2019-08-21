import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import './painel.css';

export default function DoormanPainel({ history, match }){

    var random = 1;

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

    const [ flagListOwners, setFlagListOwners ] = useState(1);
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

    async function handleDeliteOwner(id){
        await api.post('/deliteOwner', { id });
        setFlagListOwners(++random);
    }

    async function handleDeliteHouse(id){
        await api.post('deliteHouse', { id });
        setFlagListHouses(++random);
    }

    const [ term, setTerm ] = useState('');

    function searchingFor(term){
        return function(x){
            return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
        }
    }

    const [ flagAll, setFlagAll ] = useState(true)

    function settingforsell(item){
        return flagAll || item.forSell;
    }

    return (
        <div>
            <div id="userAdm">
                <h1 id="ola">{match.params.user}</h1>
                <button type="button" id="sair" onClick={e => history.push('/')}  >sair</button>
            </div>
            <div id="veichles">
                <form onSubmit={handleSubmitVeichle}>
                    <input placeholder="Digite a placa" value={plaque} onChange={e => setPlaque(e.target.value)}/>
                    <div id="buttons">
                        <button type="submit" id="findVeichles">Verificar</button>
                        {newButton}                    
                    </div>
                </form>
                {infoText}
            </div>

            {/* PAINEL CASAS E MORADORAS */}
            <div id="containerPainelDor">
                <ul>
                    <ul id="moradores">
                        {owners.filter(searchingFor(term)).map( owner => (
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
                        {houses.filter(settingforsell).map(house => (
                            <li key={house._id}>
                                <h1>Casa {house.number} Bloco {house.block}</h1>
                                <div id="buttons">
                                    <button onClick={() => history.push(`/edit/house/${house._id}/${user}`)}>editar</button>
                                    <button onClick={() => handleDeliteHouse(house._id)}>excluir</button>                                
                                </div>
                            </li>
                        ))}
                    </ul>
                </ul>
                <div id="buttonsCreateDor">
                    <div id="buttonsMoradoresDor">
                        <button id="owners" onClick={() => history.push(`/cadastrarOwner/${_id}/${user}`)}>Cadastrar</button>
                        <input id="findOwner" placeholder="Procurar morador."
                                value={term} onChange={e => setTerm(e.target.value)}
                        />
                    </div>
                    <div id="buttonsCasasDor">
                        <button id="houses" onClick={() => history.push(`/cadastrarHouse/${_id}/${user}`)}>Cadastrar</button>                        
                        <button id="houses" onClick={() => setFlagAll(false)}>À venda</button>
                        <button id="houses" onClick={() => setFlagAll(true)}>Todas</button>
                    </div>
                </div>
            </div>
        </div>
   );
};