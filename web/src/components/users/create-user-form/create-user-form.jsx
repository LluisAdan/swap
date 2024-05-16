import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/api.service';
import genreData from '../../../data/genre.json';

import './create-user-form.css';

function RegisterForm() {
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const handleUserSubmit = async (user) => {
    const data = new FormData();
    data.append("name", user.name);
    data.append("lastName", user.lastName);
    data.append("username", user.username);
    data.append("avatar", user.avatar[0]);
    data.append("email", user.email);
    data.append("password", user.password);
    data.append("birthDate", user.birthDate);
    data.append("phone", user.phone);
    data.append("genre", user.genre);

    try {
      const res = await createUser(data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form className="register d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleUserSubmit)}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row row-cols-2 w-100 h-100">

          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register("name", { required: 'Name is required'})} />
              <label>Name *</label>
              {errors.name && (<div className='invalid-feedback'>{errors.name.message}</div>)}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} {...register("lastName", { required: 'Last Name is required' })} />
              <label>Last Name *</label>
              {errors.lastName && (<div className='invalid-feedback'>{errors.lastName.message}</div>)}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register("username", { required: 'Username is required' })} />
              <label>Username *</label>
              {errors.username && (<div className='invalid-feedback'>{errors.username.message}</div>)}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="register-avatar form-floating mb-2">
              <input type="file" className={`form-control ${errors.avatar ? 'is-invalid' : ''}`} {...register("avatar")} />
              <label>Avatar</label>
              {errors.avatar && (<div className='invalid-feedback'>{errors.avatar.message}</div>)}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register("email", { required: 'Email is required' })} />
              <label>Email *</label>
              {errors.email && (<div className='invalid-feedback'>{errors.email.message}</div>)}
            </div>
          </div>
          
          <div className="col d-flex justify-content-start align-items-center">
            <div className="w-100 form-floating mb-2">
              <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register("password", { required: 'Password is required' })} />
              <label>Password *</label>
              {errors.password && (<div className='invalid-feedback'>{errors.password.message}</div>)}
            </div>
          </div>

          <div className="col d-flex justify-content-center align-items-center">

            <div className="register-birth-date form-floating mb-2">
              <input type="date" className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`} {...register("birthDate", { required: 'Birth date is required' })} />
              <label>Birth date *</label>
              {errors.birthDate && (<div className='invalid-feedback'>{errors.birthDate.message}</div>)}
            </div>

            <div className="register-phone form-floating mb-2">
              <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} {...register("phone")} />
              <label>Phone</label>
              {errors.phone && (<div className='invalid-feedback'>{errors.phone.message}</div>)}
            </div>

            <div className="register-genre form-floating mb-2">
              <select className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
                {...register("genre", {
                  required: "Genre is required"
                })}>
                {genreData.map((genre) => (<option key={genre.option} value={genre.option}>{genre.label}</option>))}
              </select>
              <label>Genre</label>
              {errors.genre && <div className='invalid-feedback'>{errors.genre.message}</div>}
            </div>

          </div>

          <div className="col d-flex justify-content-around align-items-center">

            <div className="text-required d-flex justify-content-center align-items-center">
              <span className="register-required d-flex justify-content-center align-items-center">* required fields</span>
            </div>

            <div className="btn-create-register d-flex justify-content-center align-items-center">
              <button type="submit" className='submit-form-create btn btn-secondary text-uppercase'>Register</button>
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm;