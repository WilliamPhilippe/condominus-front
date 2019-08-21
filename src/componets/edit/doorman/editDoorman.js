import React, { useEffect, useState} from 'react';
import api from '../../../services/api';

import './editarDoorman.css';

export default function EditDoorman( { history, match } ){

    const { _id, user } = match.params;

    const [ name, setName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ username, setUsername ] = useState('');

    useEffect(() => {

        async function loadData(){
            const doormanData = await api.get(`/getDoormanById/${_id}`);

            console.log(doormanData.data);

            setName(doormanData.data.name);
            setPhone(doormanData.data.phone);
            setUsername(doormanData.data.user);
        }

        loadData();

    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        await api.post('/edit/doorman', {
            name,
            phone,
            user: username
        }, { headers: { _id } });

        history.go(-1)
    }

    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Editar Porteiro</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome:"/>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username:"/>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Bloco:"/>
                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="editdoorman" onClick={() => history.go(-1) }>voltar</button>
        </div>
    )
}