
import { Container, Grid, Button, TextField, Box, Snackbar, Alert } from "@mui/material"; 
import {useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import toast from "react-hot-toast";


type FormValue={
  name:string,
  phone:string,
  email:string
}


const Home:React.FC = () =>{
  const{register, handleSubmit, formState:{errors}} = useForm<FormValue>()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValue>=(data)=>{
    if (Object.keys(errors).length === 0){
      navigate('/SecondPage');
      
      
    }else{
      toast.error("error")
    }

    
    console.log("final data", data)
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }
    return(
      <div >
        <Container fixed>
          <div className="form-wrapper">
              <Grid container spacing={2} >
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box component="section" sx={{p:2, color:'#1d395d', textAlign:'left'}}>
                          <h1>Login</h1>
                      </Box>
                      <Box >
                        <TextField fullWidth
                          label="Name"
                          placeholder="Enter Name"
                          {
                            ...register("name", {
                              required:"Name is required",
                            })
                          }
                          
                        />
                        {
                          errors.name &&(
                            <p className="error-msg">{errors.name.message}</p>
                          )
                        }
                        <TextField fullWidth 
                          label="Phone Number"
                          placeholder="Enter Phone Number"
                          
                          
                          {
                            ...register("phone", {
                              required:"Phone Number is required",
                              pattern:{
                                value: /^[0-9]{10}$/,
                                message:"Phone number must be of 10 digits",
                              },
                            })
                          }
                          variant="outlined"
                          inputProps={{pattern: '[0-9]*', maxLength: 10 }}
                          
                          
                          
                          style={{marginTop:'40px'}}
                          />
                          {
                          errors.phone &&(
                            <p className="error-msg">{errors.phone.message}</p>
                          )
                        }
                         
                        
                        
                        <TextField fullWidth 
                          label="Email"
                          placeholder="Enter Email"
                          {
                            ...register("email", {
                              required:"Email is required",
                              pattern:{
                                value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message:"Invalid Email (eg: ABC@gmail.com)"
                              }

                            })
                          }
                          
                          style={{marginTop:'40px'}}/>
                        {
                          errors.email &&(
                            <p className="error-msg">{errors.email.message}</p>
                          )
                        }
                        <Button style={{marginTop:'40px'}} type="submit"   variant="contained" >Next</Button>
                      </Box>
                      
                      
                    </form>
                </Grid>

              </Grid>
          </div>
          
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message='Enter the required details'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}

        >
           <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Enter the required details
        </Alert>
          </Snackbar>

      </div>
  )

}

export default Home;