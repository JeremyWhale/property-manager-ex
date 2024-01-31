import { Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { IcPageHeader } from "@ukic/react";
import { Login } from "@mui/icons-material";
import axios from "axios";
import apiLocation from "../components/apiLocation";

export default function LoginView() {
  const [loginErrored, setLoginErrored] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleLogin() {
    axios
      .post(`${apiLocation}/login/`, `username=${username}&password=${password}`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          window.localStorage.setItem("user", JSON.stringify(data.name));
          setLoginErrored(false);
          window.open("/", "_self");
        } else {
          setLoginErrored(true);
        }
      })
      .catch((error) => {
        setLoginErrored(true);
      });
  }

  return (
    <>
      <IcPageHeader heading="AJO Property Manager Login" />
      <Grid container spacing={2}  direction="column" justifyContent="center" alignItems="center" sx={{ paddingTop: 2 }}>
        <Grid item>
          <TextField
            error={loginErrored}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            sx={{ textAlign: 'center' }}
          />
        </Grid>
        <Grid item>
          <TextField
            error={loginErrored}
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ textAlign: 'center' }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Login />}
            disabled={username === undefined || password === undefined}
            onClick={() => handleLogin()}
            sx={{ textAlign: 'center' }}
          >
            Log in
          </Button>
        </Grid>
      </Grid>
    </>
  );
}