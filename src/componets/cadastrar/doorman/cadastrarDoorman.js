import React, {useState} from 'react';

import api from '../../../services/api';

export default function CadastrarDoorman({history, match}){
    
    const { _id, user } = match.params;

    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const typeEmp = "doorman";


    async function handleSubmit(e){
        e.preventDefault();

        const reponse = await api.post('/adm/create/doorman',{
            name,
            phone,
            user: username,
            email,
            typeEmp
        });

        history.go(-1)
    }

    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Cadastrar Porteiro</p>
                <input type="text" placeholder="Digite o nome"
                    value={name} onChange={e => setName(e.target.value)}/>

                <input id="phone" type="text" placeholder="Telefone"
                    value={phone} onChange={e => setPhone(e.target.value)}/>

                <input id="email" type="text" placeholder="Email"
                    value={email} onChange={e => setEmail(e.target.value)}/>

                <input id="username" type="text" placeholder="username"
                    value={username} onChange={e => setUsername(e.target.value)} />

                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="voltar" onClick={() => history.go(-1) }>voltar</button>
        </div>
    );

}