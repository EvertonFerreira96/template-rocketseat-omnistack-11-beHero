import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/img/logo.svg'

function Profile(){
    
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', 
        {
            headers: {
                ong_id: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    },[ongId]);

    async function handleIncidentDelete(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    ong_id: ongId,
                }
            });
        }
        catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
        setIncidents(incidents.filter(incident => incident.id !== id));
    }
    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }
   
    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="logo"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new" >Registrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button type="submit" onClick={() => handleIncidentDelete(incident.id)}>
                        <FiTrash2 size={20} color="#A8A8B3"/>
                    </button>
                    </li>          
                ))}
            </ul>
        </div>
    );
}

export default Profile;