import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [mess, setMess] = React.useState("");

  function body() {
    return {
      userName: userName,
      password: password,
    };
  }

  function loginCLick() {
    fetch("http://localhost:5010/account/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body()),
      cache: "default",
    })
      .then((response) => response.json())
      .then((json) => {
        const success = json.success;
        console.log(json);
        if (success) {
          navigate("/mainpage/home");
        } else {
          setMess(json.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={style.login}>
      <div className={style.container}>
        <form>
          <img className={style.image}></img>

          <Stack spacing={2}>
            <TextField
              id="username-input"
              label="Tên người dùng"
              variant="filled"
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              id="password-input"
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              variant="filled"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={style.message}>{mess}</span>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                m: 1,
              }}
            >
              <Button variant="contained" onClick={loginCLick}>
                Đăng nhập
              </Button>
            </Box>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default Login;
