import AuthContext from "./authContext";
import axios from "../../axiosConfig";
import Auth from "../../utils/AuthStorage";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import showToast from "../../services/toasterService";
// import { useNavigate } from "react-router-dom"

const AuthState = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(Auth.getToken() ? true : false);
  const [user, setUser] = useState();
  const [socket, setSocket] = useState();

  const { token } = Auth.getToken();

  //   const navigate = useNavigate()

  useEffect(() => {
    console.log("token", token);
    if (token) {
      getUserDetails();
    } else {
      setAuthStatus(false);
    }
  }, [token]);

  const getUserDetails = async () => {
    console.log("get user details");
    return await axios
      .post(`/api/getUser`, { token: Auth.getToken().token })
      .then(({ data }) => {
        console.log("print user", data.data);
        setUser(data.data);
        createSocket(data.data);
        setAuthStatus(true);
        return data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  const createSocket = (user) => {
    let email = user.email;
    const newSocket = io(process.env.REACT_APP_NOT_SOCKET_URL, {
      transports: ["websocket"],
      query: { email },
    });
    console.log("new socket", newSocket);
    setSocket(newSocket);
    return () => newSocket.close();
  };

  const Login = ({ email, password }, setErrors, setIsLoading) => {
    const errors = [];

    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email || !emailCheck.test(email)) {
      errors.push("*Email is incorrect");
    }

    if (!password || password.length < 6) {
      errors.push(
        "*Password is incorrect, length must be more than 6 characters"
      );
    }

    setErrors(errors);

    console.log("login data from auth context", email, password);

    const loginData = {
      email: email,
      password: password,
    };

    if (!errors.length) {
      setIsLoading(true);
      return axios
        .post(`/api/login`, loginData)
        .then(({ data }) => {
          setIsLoading(false);
          console.log("login data", data);
          Auth.setToken(data.id, data.token);
          getUserDetails();
          setAuthStatus(true);
          window.location.pathname = "/learner-page";
          showToast("success", "Login Successful");
          return data;
        })
        .catch((error) => {
          setIsLoading(false);
          //   const errorType = error.response.data.error
          showToast("error", "errorType");
          console.log("print error", error);
          //   setErrors(errorType)
          return error;
        });
    }
  };

  const resetPassword = async ({ body, setData, setLoading, setError }) => {
    setLoading(true);
    setError(false);
    return await axios
      .post(`/api/reset-password`, body)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        console.log("ResetPassword Fetch ------------------");
        return data;
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(error);
        return error;
      });
  };

  return (
    <AuthContext.Provider
      value={{ Login, authStatus, user, socket, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
