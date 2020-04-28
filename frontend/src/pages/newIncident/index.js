import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'; 

import api from '../../services/api';

import {FiArrowLeft} from 'react-icons/fi';  

import './styles.css';

import logo from '../../assets/img/logo.svg';
import { useState } from 'react';

function Incident(){

    const ongId = localStorage.getItem('ongId'); 
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
        try{
            await api.post('incidents', data,
            {
                headers:{ 
                    ong_id: ongId,
                },
            });
            history.push('/profile');
        }
        catch(err){
            alert('Erro ao cadastrar Incident')
        }
    }

    return(
        <div className="register-incident"> 
        <div className="content">
            <section>
                <img src={logo} alt="logo"/>
                <h1>Cadastro Novo Caso</h1>
                <p>Descreva-o detalhadamente para encontrar um herói para resolve-lo</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Home
                </Link>
            </section>                    
            <form action="" onSubmit={handleNewIncident}>
                <input 
                placeholder="Título do Caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input 
                placeholder="R$"
                value={value}
                onChange={e => setValue(e.target.value)}
                />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}

export default Incident;