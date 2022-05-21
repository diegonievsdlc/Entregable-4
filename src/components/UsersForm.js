import axios from 'axios';
import { useEffect} from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUsers, showAndHideModal, usernameSelected, deselectUser, users}) => {
    const {register, handleSubmit, reset} = useForm()
    const defaultValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birthday: ''
    }
    useEffect(() => {
        if(usernameSelected !== null){
            reset({
                first_name: usernameSelected.first_name,
                last_name: usernameSelected.last_name,
                email: usernameSelected.email,
                password: usernameSelected.password,
                birthday: usernameSelected.birthday
            })
        }
    }, [usernameSelected, reset])
    const submit = data => {
        if(usernameSelected === null){
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(() => getUsers())
        }else{
            putUserEdited(data)
        }
        showAndHideModal()
        deselectUser()
        reset(defaultValues)
    }

    const putUserEdited = data => {
        for(let i = 0; i < users.length; i++){
            if(users[i].email === data.email){
                axios.put(`https://users-crud1.herokuapp.com/users/${users[i].id}/`, data)
                    .then(() => getUsers())
            }
        }
    } 
    
    return (
        <div className='users-form modal'>
            <form onSubmit={handleSubmit(submit)}>
                <button 
                    type='button'
                    className='btn-close'
                    onClick={() => {
                        deselectUser()
                        showAndHideModal()
                    }}>
                        <i className='bx bx-x'></i>
                </button>
                {
                    usernameSelected === null ? <h2>Nuevo Usuario</h2> : <h2>Editar Usuario</h2> 
                }
                <div>
                    <label htmlFor='first_name'>Nombre</label>
                    <input type="text" {...register('first_name')} id='first_name' placeholder='Nombre'/>
                </div>
                <div>
                    <label htmlFor='last_name'>Apellido</label>
                    <input type="text" {...register('last_name')} id='last_name' placeholder='Apellido'/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" {...register('email')} id='email' placeholder='Email'/>
                </div>
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input type="password" {...register('password')} id='password' placeholder='Contraseña'/>
                </div>
                <div>
                    <label htmlFor='birthday'>Fecha de nacimiento</label>
                    <input type="date" {...register('birthday')} id='birthday' placeholder='MM/DD/YYYY'/>
                </div>
                <button className='btn-to-accept'>{usernameSelected === null ? 'Agregar nuevo usuario' : 'Guardar Cambios'}</button>
            </form>
        </div>
    );
};

export default UsersForm;