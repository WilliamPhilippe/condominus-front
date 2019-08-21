import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

export default function CreateVeichle({ history, match }){

    const { plaque: plaqueSetted, user } = match.params;

    const [ plaque, setPlaque ] = useState(plaqueSetted);
    const [ houseNumber, setHouseNumber ] = useState('');
    const [ houseBlock, setHouseBlock ] = useState('');
    const [ status, setStatus ] = useState(true);

    async function handleSubmit(e){
        e.preventDefault();

        const created = await api.post(`/x/create/veichles`, {
            plaque,
            houseNumber,
            houseBlock,
            status
        })

        history.go(-1)
    }

    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Cadastrar Veículo</p>
                <h1 id="edithouse">Placa:</h1>                
                <input type="text" value={plaque} onChange={e => setPlaque(e.target.value)} placeholder="Placa:"/>                
                <h1 id="edithouse">Casa:</h1>                
                <input type="text" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} placeholder="Casa:"/>
                <h1 id="edithouse">Bloco:</h1>                
                <input type="text" value={houseBlock} onChange={e => setHouseBlock(e.target.value)} placeholder="Bloco:"/>
                <h1 id="edithouse">permitido? (true or false)</h1>
                <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Ocupada? (true or false)"/>
                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="voltarEditOwner" onClick={() => history.go(-1) }>voltar</button>
        </div>
    )
}