import React, {useState, useEffect} from 'react';

import api from '../../../services/api'

import './editOwner.css'

export default function EditOwner( {history, match} ){

    const { _id: ownerID, user } = match.params;

    const [name, setName] = useState();
    const [phone, setPhone ] = useState();
    const [ email, setEmail ] = useState();
    const [ houseNumber, setHouseNumber ] = useState();
    const [ houseBlock, setHouseBlock ] = useState();
    const [ username, setUsername ] = useState();

    useEffect(() => {
        async function setValues(){
            const ownerData = await api.get(`/getOwnerById/${ownerID}`);

            setName(ownerData.data.name);
            setPhone(ownerData.data.phone);
            setEmail(ownerData.data.email);
            setHouseNumber(ownerData.data.houseNumber);
            setHouseBlock(ownerData.data.houseBlock);
            setUsername(ownerData.data.user);
        }

        setValues();
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

        await api.post('/edit/owner', {
            name,
            phone,
            email,
            houseNumber,
            houseBlock,
            user: username
        }, { headers: { user: ownerID } });

        history.go(-1)
        

    }

    
    return (
        <div id="cadastrar">
            <form onSubmit={handleSubmit}>
                <p>Editar Morador</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome:"/>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username:"/>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone:"/>
                <input type="text" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} placeholder="Casa:"/>
                <input type="text" value={houseBlock} onChange={e => setHouseBlock(e.target.value)} placeholder="Bloco:"/>
                <div><button type="submit">Salvar</button></div>
            </form>
            <button type="button" id="voltarEditOwner" onClick={() => history.go(-1) }>voltar</button>
        </div>
    )
}