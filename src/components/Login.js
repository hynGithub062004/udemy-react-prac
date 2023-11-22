import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="login-container col-xl-4 col-md-6 col-sm-12">
      <h3 className="login-header text-center">Log in</h3>
      <div className="login-body">
        <div className="title d-flex">
          <p>Email or Username</p>
        </div>
        <div className="form d-flex flex-column">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email...."
          />
          <div className="input-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
              type={isShowPassword === false ? "password" : "text"}
              placeholder="Password"
            />
            <i
              onClick={() => setIsShowPassword(!isShowPassword)}
              class={
                isShowPassword === true
                  ? "fa-solid fa-eye"
                  : "fa-solid fa-eye-slash"
              }
            ></i>
          </div>
          <p className="mt-3">Forgot password?</p>

          <button
            className={email && password ? "btn-login active" : "btn-login"}
            disabled={email && password ? false : true}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="login-footer mt-5 text-center">
        <i class="fa-solid fa-angle-left"></i>
        Go back
      </div>
    </div>
  );
}

export default Login;
