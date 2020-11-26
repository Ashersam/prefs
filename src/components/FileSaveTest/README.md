
```js

import { Box, Button, FormControl, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { ProfileStyles } from './useStyles/ProfileStyles';
import useSavetoLocal from './useSavetoFile'
import usePrefs from './usePrefs'
import * as helper from "../../core/backend"


const localStorageConfig = {
  type: "localStorage",
  name: "profile",
  maxSize: "5MB",
}

const localForageConfig = {
  type: "localForage",
  name: "profile",
  maxSize: "5MB",
}

const fsConfig = {
  type: "fs",
  name: "profile_default",
  maxSize: "5MB",
}

function Component() {
  const classes = ProfileStyles();
    const [values, setValues] = useState({
        first:"",
        last: "",
        email: "",
        password: "",
        showPassword: false,
      });
    const [selectedBackendstore, setSelectedBackendstore  ] = useState(localStorageConfig)
        
    const {
      state: { 
        validator,
        validationMessage,
        initialValue
      },
        action: {
          updateStorage,
          deleteStorage
        }
    } = usePrefs({ 
            key: "settings2",  
            values: values, 
            backendfn: selectedBackendstore, 
            tag: "profile",
        })
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    useEffect(() => {
      console.log(initialValue)
        initialValue.then((res) => {
          if(res!==null)
            setValues(res)
        })
    },[])

    const handleBackendSave = (event) => {
      setSelectedBackendstore(event.target.value)
    }

    const update = (event) => {
        updateStorage()
    }

    const deleteStore = () => {
        deleteStorage()
    }

  const form = React.useMemo(
    () => (
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <form
              noValidate
              autoComplete="off"
              
            >
              <Typography
                variant="h6"
                color="inherit"
              >
                <Box fontWeight={600} m={1}>
                  Settings
                </Box>
              </Typography>
                  <TextField
                    className={classes.textfieldsmall}
                    label="First Name"
                    variant="outlined"
                    type="text"
                    value={values.first}
                    onChange={handleChange('first')}
                  />
                  <TextField
                    className={classes.textfieldsmall}
                    label="Last Name"
                    variant="outlined"
                    value={values.last}
                    onChange={handleChange('last')}

                  />
              <div>
                    <TextField
                      className={classes.textfieldsmall}
                      label="Email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange('email')}
                    />
              </div>
              <div>
                <FormControl
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    className={classes.textfieldsmall}
                    onChange={handleChange('password')}
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
        <FormLabel component="legend">
          <Box fontWeight={600} m={1}>
            Select Backend
          </Box>
        </FormLabel>
        <Select
          className={classes.textfieldsmall}
          variant="outlined"
          value={selectedBackendstore}
          onChange={(event) => handleBackendSave(event)}
        >
            <MenuItem value={localStorageConfig}>
              localStorage
            </MenuItem>
            <MenuItem value={localForageConfig}>
              localForage
            </MenuItem>
            <MenuItem value={fsConfig}>
              fsWrite
            </MenuItem>
          </Select>
                </FormControl>
              </div>
              <span>
              <Button
                variant="contained"
                color="primary"
                onClick={update}
              >
              Update
              </Button>
              <Button
                className={classes.avataredits}
                variant="contained"
                color="secondary"
                onClick={deleteStore}
              >
              Delete
              </Button>
              </span>
            </form>
          </Grid>
        </Grid>
      </Paper>
    ),
    [values, selectedBackendstore]
  );


  return (
    <>
      {form}
    </>
  );
}

<Component />
```
