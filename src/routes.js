import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';

import Home from './componets/home/home';
import Access from './componets/access/access';
import ownerPainel from "./componets/owner/painel/ownerPainel";
import AdmPainel from "./componets/adm/painel/admPainel";
import doormanPainel from "./componets/doorman/painel/doormanPainel";
import cadastrarOwner from './componets/cadastrar/owner/cadastrarOwner';
import cadastrarHouse from './componets/cadastrar/house/cadastrarHouse';
import cadastrarDoorman from './componets/cadastrar/doorman/cadastrarDoorman'
import editOwner from './componets/edit/owner/editOwner';
import editHouse from './componets/edit/house/editHouse';
import editDoorman from './componets/edit/doorman/editDoorman';
import editVeichle from './componets/edit/veichle/editVeichle';
import createVeichle from './componets/cadastrar/veichle/createVeichle';


export default function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/access/:type" component={Access} />
            <Route path="/adm/:_id/:user"  component={AdmPainel} />
            <Route path="/owner/:_id/:user"  component={ownerPainel} />       
            <Route path="/doorman/:_id/:user"  component={doormanPainel} />
            <Route path="/cadastrarHouse/:_id/:user" component={cadastrarHouse}/>
            <Route path="/cadastrarOwner/:_id/:user" component={cadastrarOwner} />
            <Route path="/cadastrarDoorman/:_id/:user" component={cadastrarDoorman} />
            <Route path="/create/veichle/:plaque/:user" component={createVeichle} />


            <Route path="/edit/owner/:_id/:user/" component={editOwner} />   
            <Route path="/edit/house/:_id/:user/" component={editHouse} />
            <Route path="/edit/doorman/:_id/:user/" component={editDoorman} />      
            <Route path="/edit/veichle/:plaque/:user/" component={editVeichle} />


        </BrowserRouter>
    );
}