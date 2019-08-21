import React from 'react';

import './home.css';

const home = ({history}) => {

    function toDoormanAccess(e){
        e.preventDefault();
        history.push('/access/doorman');
    }

    function toAdmAccess(e){
        e.preventDefault();
        history.push('/access/adm');
    }

    function toOwnerAccess(e){
        e.preventDefault();
        history.push('/access/owner');
    }

    return (
    <div id="homeMain">
        <h1 id="login">Login</h1>
        <h1 id="text">Como você deseja fazer o login?</h1>
        <div className="buttons">
            <button id="adm" onClick={toAdmAccess}>Síndico</button>
            <button id="owner" onClick={toOwnerAccess}>Morador</button>
            <button id="doorman" onClick={toDoormanAccess}>Porteiro</button>
        </div>
    
    </div>
    );
};

export default home;