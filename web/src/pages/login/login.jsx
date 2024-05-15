import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';
import { useAlert } from '../../contexts/alert-context/alert.context';

function Login() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { doLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) { 
    try {
      await doLogin(data);

      navigate('/');
    } catch (err) {
      showAlert('Invalid credentials');
    }
  };
  
  return (
    <>
      <div className="form-login my-3 position-absolute top-50 start-50 translate-middle">
        <div className="login-top my-4">
            <h1 className="mb-3">Log in</h1>
        </div>

        <form className="login-body d-flex row align-items-around" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-username">
                <input type="text" id="username" className={`form-control form-control-lg ${errors.username ? "is-invalid" : ""}`} {...register("username")} placeholder="Username" />
            </div>
            <div className="input-password">
                <input type="password" id="password" className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`} {...register("password")} placeholder="Password" />
            </div>
            <div className="div-btn-login d-flex justify-content-center align-items-center">
              <button type="submit" className="btn-form-login btn btn-secondary text-uppercase">Log in</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default Login;