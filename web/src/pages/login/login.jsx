import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login, storeAccessToken } from '../../services/api.service';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState();

  async function onSubmit(data) { 
    try {
      const response = await login(data);
      storeAccessToken(response.data.accessToken);
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };
  
  return (
    <>
      <div className="form-login rounded-2 my-3 position-absolute top-50 start-50 translate-middle justify-content-center">
        <div className="login container my-4">
            <h1 className="mb-3">Log in</h1>
        </div>

        <div className="mt-3 mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="alert alert-danger" >Invalid credentials</div>}
                <div className="form mb-3">
                    <input type="text" id="username" className={`form-control form-control-lg ${errors.username ? "is-invalid" : ""}`} {...register("username")} placeholder="Username" />
                </div>
                <div className="form mb-3">
                    <input type="password" id="password" className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`} {...register("password")} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary w-100 upper mt-1">Log in</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Login;