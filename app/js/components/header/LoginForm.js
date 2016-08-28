import React from 'react';
import {Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox} from 'react-bootstrap';

const LoginForm = (
	<div>
	If you don't have an account, you will be registered automatically. Please use either Facebook or Google always as a new account will be created otherwise. 
Login with <a href="/login/google-oauth2?email=success.super">Google</a>
OR <a href="/login/facebook">Facebook</a>
</div>
);

export default LoginForm;
