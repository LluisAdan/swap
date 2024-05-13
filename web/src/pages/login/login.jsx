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
      <div className="form-login rounded-2 my-3 position-absolute top-50 start-50 translate-middle justify-content-center">
        <div className="login container my-4">
            <h1 className="mb-3">Log in</h1>
        </div>

        <div className="mt-3 mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
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