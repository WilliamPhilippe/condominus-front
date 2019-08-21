import React, {useState, useEffect} from 'react';

import api from '../../../services/api';

export default function EditVeichle({ history, match }){
    
    const { plaque, user } = match.params;

    const [ houseNumber, setHouseNumber ] = useState('');
    const [ houseBlock, setHouseBlock ] = useState('');
    const [ status, setStatus ] = useState();

    useEffect(() => {
        async function loadData(){
            var veichle = await api.post(`/verifyVeichle`, {
                plaque
            });

            veichle = veichle.data.veichleExists;

            setHouseBlock(veichle.houseBlock);
            setHouseNumber(veichle.houseNumber);
            setStatus(veichle.status);
        }

        loadData();
    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        await api.post(`/edit/veichle`, {
            houseNumber,
            houseBlock,
            status
        }, { headers: {plaque} });

        history.go(-1);
    }
    
    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Editar Veículo {plaque}</p>
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