import React, {Component} from "react";
import Main from '../template/Main';
import './UserCrud.css';
import axios from 'axios';
import { Navigate } from 'react-rooter-dom';

const headerProps ={
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
};

const baseUrl = 'https://localhost:3001/users';
const initialState = {
    user: {name: '', email: ''},
    list: []
};

export default class UserCrud extends Component{
    state = {...initialState};

    componentDidMount(){
        axios (baseUrl)
        .then(resp => this.setState({ list: resp.data}))
        .cath(err => console.error("Erro ao carregar usuários: ", err));
    }

    clear(){
        this.setState({ user: initialState.user});
    }

    save(){
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}`: baseUrl;

        axios[method](url, user)
        .then(resp => {
            const list = this.getUpdateList(resp.data);
            this.setState({ user: initialState.user, list});
        })
        .catch(err => console.error("Erro ao salvar o usuário:", err));
    }

    getUpdateList(){
        const list = this.state.list.filter(u => u.id !== user.id);
        if(add) list.unshift(user);
        return list;
    }

    getUpdateField(event){
        const user = {...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    renderForm(){
        return(
            <div className="form card shadow-sm p-3">
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={this.state.user.name}
                            onChange={e => this.getUpdateField(e)}
                            placeholder="Digite o nome"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}