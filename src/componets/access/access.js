import React, { useState } from 'react';
import api from '../../services/api';

import './access.css';

export default function Access({ history, match }){

    const [username, setUsername] = useState('');
    const [notFound, setNotFound] = useState('');
    const type = match.params.type;

    async function handleSubmit(e) {
        e.preventDefault();
        

        if(type === 'adm'){
            const response = await api.post('/adm/access', { user: username});
            
            if(response.data.newStatus === 400) setNotFound('Não encontrado');
            else{
                const { _id, user } = response.data.user;
                history.push(`/adm/${_id}/${user}`);
            }
            
        }
        if(type === 'owner'){
            const response = await api.post('/owner/access', { user: username});
            
            if(response.data.newStatus === 400) setNotFound('Não encontrado');
            else{
                const { _id, user } = response.data.user;
                history.push(`/owner/${_id}/${user}`);
            }
        }
        if(type === 'doorman'){
            const response = await api.post('/doorman/access', { user: username});
            
            if(response.data.newStatus === 400) setNotFound('usuário não encontrado.');
            else{
                const { _id, user } = response.data.user;
                history.push(`/doorman/${_id}/${user}`);
            }
        }
        
    }

    return (
        <div id="access-container">
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="Digite seu username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">entrar</button>
            </form>
            <button id="backHome" onClick={e => history.push('/')}>voltar</button>
            <h1>{notFound}</h1>
        </div>        
    );
}