
```js

import { Box, Button, FormControl, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { WriteToFile } from '../../core/writefile'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ProfileStyles } from '../FileSaveTest/useStyles/ProfileStyles';
import usePrefs from '../FileSaveTest/usePrefs';

function Component() {
  const classes = ProfileStyles()
    const [values, setValues] = useState({
        first:"",
        last: "",
        email: "",
        password: "",
        showPassword: false,
      });
      const {
        state: { 
          validationError,
          validationMessage 
        },
        action: { 
          custom
        }
      } = usePrefs({
        backendfn: WriteToFile 
      })
      const [showLoading, setShowLoading] = useState(false)
      
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const WriteAndDownload = () => {
      custom({ 
        key: 'settings_custom',
        values: values
      })
      if(validationError) setShowLoading(true)
      let timer1 = setTimeout(() => setShowLoading(false), 2000)
           return () => {
        clearTimeout(timer1)
      }
    }

    return (
        <>
        <Paper>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <form
              noValidate
              autoComplete="off"
              
            >
            {showLoading && (
              <Typography
                variant="h6"
                color="inherit"
              >{validationMessage}</Typography>
            )}
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
                </FormControl>
              </div>
              <Button
              color="primary"
            variant="contained"
            onClick={WriteAndDownload}
            >Save</Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
        </>
    )
}
<Component />
```