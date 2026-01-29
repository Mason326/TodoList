import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../../components/sign-in/components/ForgotPassword.jsx';
import AppTheme from '../../shared-theme/AppTheme';
import { signInWithEmailAndPassword } from '../../api/user.js';
import ColorModeSelect from '../../shared-theme/ColorModeSelect.jsx';
import CustomizedSnackbars from '../notfifcations/snackbar/CustomizedSnackbars.jsx';
import { SitemarkIcon } from './components/CustomIcons.jsx';
import { useNavigate } from "react-router-dom";
import { fetchAdmins } from "../../api/admin.js";
import { createUser } from '../../api/admin.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 90dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  //const { onChangeAuth } = props;
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [displaySnack, setDisplaySnack] = React.useState({
    isShowed: false,
    severity: null,
    text: null
  });

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setDisplaySnack((prev) => {
      return {
      ...prev,
      isShowed: false
    }
  });
};

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if(isValid) {
      handleSignInWithEmail(email.value, password.value);
    }
  };

  async function handleSignInWithEmail(email, password) {
      try {
        const successSignIn = await signInWithEmailAndPassword(email, password);
        setDisplaySnack(() => {
          return {
            isShowed: true,
            text: "Successfull sign in",
            severity: "success"
          }
        });
        if(!localStorage.getItem('lastPrompt')) {
          localStorage.setItem('lastPrompt', JSON.stringify({ user_prompt: '', ai_response: '', prompt_date: new Date(0), response_date: new Date(0) }))
        }
        setTimeout(() => {
          navigate("/dashboard",  {replace: false})
        }, 3000);
      }
      catch(e) {
        setDisplaySnack(() => {
          return {
            isShowed: true,
            text: `${e.message}`,
            severity: "error"
          }
        });
      }
    }

  return (
    <>
    <CustomizedSnackbars openState={displaySnack} setOpen={setDisplaySnack} onClose={handleClose} />
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '8rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            // component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} snackBarVisibility={setDisplaySnack} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            {/* <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link> */}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Button
              onClick={() => navigate("/signUp", {replace: true})}
              variant="body2"
              sx={{ alignSelf: 'center', textDecoration: "underline"  }}
              >
                Sign up
              </Button>
            </Typography>
          </Box>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Button
            onClick={() => navigate("/", {replace: true})}
            variant="body2"
            sx={{ alignSelf: 'center', textDecoration: "underline", textAlign: "center" }}
            >
              Back To Home Page
            </Button>
        </Box>
      </SignInContainer>
    </AppTheme>
    </>
  );
}
