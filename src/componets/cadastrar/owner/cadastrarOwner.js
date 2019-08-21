import React, { useState } from 'react';
import api from '../../../services/api';

import './cadastrarOwner.css';

export default function CadastrarOwner({history, match}){

    const { _id, user } = match.params;

    const [name, setName] = useState('');
    const [number, setNumber] = useState();
    const [block, setBlock] = useState();
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/adm/create/owner', {
            user: username,
            name,
            houseNumber: number,
            houseBlock: block
        });


        history.go(-1)
    }

    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Cadastrar Morador</p>
                <input type="text" placeholder="Digite o nome"
                    value={name} onChange={e => setName(e.target.value)}/>

                <input id="houseNumber" type="number" placeholder="Casa"
                    value={number} onChange={e => setNumber(e.target.value)}/>

                <input id="houseBlock" type="number" placeholder="Bloco"
                    value={block} onChange={e => setBlock(e.target.value)}/>

                <input id="username" type="text" placeholder="username"
                    value={username} onChange={e => setUsername(e.target.value)} />

                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="voltar" onClick={() => history.go(-1) }>voltar</button>
        </div>
    );

}

