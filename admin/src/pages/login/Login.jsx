import './login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from '../../constant/actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickLogin = async () => {
    dispatch({ type: LOGIN_START });

    try {
      const response = await axios.post('/auth/login', credentials);
      if (response.data.isAdmin) {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        navigate('/');
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: { message: 'You are not allowed!' } });
      }
    } catch (e) {
      dispatch({ type: LOGIN_FAILURE, payload: e.response.data });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <input
          type="text"
          placeholder="username"
          name="username"
          className="login-input"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="login-input"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="button"
          className="login-btn"
          onClick={handleClickLogin}
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
