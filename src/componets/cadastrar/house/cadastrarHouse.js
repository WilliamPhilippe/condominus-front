import React, { useState } from 'react';
import api from '../../../services/api';

import '../house/cadastrarHouse.css';

export default function CadastrarOwner({history, match}){

    const { _id, user } = match.params;

    const [number, setNumber] = useState();
    const [block, setBlock] = useState();
    // const [username, setUsername] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        
        const houseC = await api.post('/adm/create/house', {
            number,
            block,
        })

        history.go(-1)
    }

    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Cadastrar Casa</p>

                <input id="houseNumber" type="number" placeholder="Casa"
                    value={number} onChange={e => setNumber(e.target.value)}/>

                <input id="houseBlock" type="number" placeholder="Bloco"
                    value={block} onChange={e => setBlock(e.target.value)}/>
                
                {/* <input id="moradorUsername" type="text" placeholder="username do morador"
                    value={username} onChange={e => setUsername(e.target.value)}/> */}

                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="voltar" onClick={() => history.go(-1) }>voltar</button>
        </div>
    );

}

