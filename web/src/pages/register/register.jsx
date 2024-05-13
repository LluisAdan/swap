import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/api.service';
import { useAlert } from '../../contexts/alert-context/alert.context';

function Register() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await createUser(data);
      navigate('/login');
    } catch (err) {
      showAlert('Invalid register');
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name *
          </label>
          <input required type="text" id="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} {...register('name')} />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input required type="text" id="lastName" className={`form-control ${errors.lastName ? "is-invalid" : ""}`} {...register('lastName')} />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username *
          </label>
          <input required type="text" id="username" className={`form-control ${errors.username ? "is-invalid" : ""}`} {...register('username')} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address *
          </label>
          <input required type="email" id="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} {...register('email')} />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input required  type="password" id="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} {...register('password')} />
        </div>

        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Avatar
          </label>
          <input type="text" id="avatar" className={`form-control ${errors.avatar ? "is-invalid" : ""}`} {...register('avatar')} />
        </div>
        
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Birth date *
          </label>
          <input required type="date" id="birthDate" className={`form-control ${errors.birthDate ? "is-invalid" : ""}`} {...register('birthDate')} />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="text" id="phone" className={`form-control ${errors.phone ? "is-invalid" : ""}`} {...register('phone')} />
        </div>

        <p>* required fields</p>

        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </>
  )
}

export default Register;