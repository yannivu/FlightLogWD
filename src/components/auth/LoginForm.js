import React from "react";

const LoginForm = ({ credentials, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
