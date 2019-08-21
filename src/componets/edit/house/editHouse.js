import React, { useState, useEffect } from 'react';

import api from '../../../services/api'

import './edithouse.css';

export default function EditHouse( { history, match } ){

    const { _id, user } = match.params;

    const [ number, setNumber ] = useState();
    const [ block, setBlock ] = useState();
    const [ username, setUsername ] = useState('');
    const [ inUse, setInUse ] = useState();
    const [ forSell, setForSell ] = useState();

    useEffect(() => {
        async function loadParams(){
            const house = await api.get(`/getHouseById/${_id}`);

            if(house.data.ownerID){
                const reponse = await api.get(`/getOwnerById/${house.data.ownerID}`);
                
                setUsername(reponse.data.user);
            }

            setNumber(house.data.number);
            setBlock(house.data.block);
            setInUse(house.data.inUse);
            setForSell(house.data.forSell);  
        }

        loadParams();
    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        const owner = await api.get(`/getOwnerByUser/${username}`);

        await api.post('/edit/house', {
            number,
            block,
            inUse,
            forSell,
            ownerID: owner.data._id
        }, { headers: { _id }});

        history.go(-1)
    }

    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Editar Casa</p>
                <input type="text" value={number} onChange={e => setNumber(e.target.value)} placeholder="Casa:"/>
                <input type="text" value={block} onChange={e => setBlock(e.target.value)} placeholder="Bloco:"/>
                <h1 id="edithouse">ocupada? (true or false)</h1>
                <input type="text" value={inUse} onChange={e => setInUse(e.target.value)} placeholder="Ocupada? (true or false)"/>
                <h1 id="edithouse">à venda? (true or false)</h1>
                <input type="text" value={forSell} onChange={e => setForSell(e.target.value)} placeholder="À venda? (true or false)"/>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Dono username"/>
                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="voltarEditOwner" onClick={() => history.go(-1) }>voltar</button>
        </div>
    )
}