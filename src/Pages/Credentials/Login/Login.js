import React, { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import EmailModal from './EmailModal';
import OtpModal from './OtpModal';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from './ChangePasswordModal';
import './Login.css'; 

const Login = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = (email) => {
        setEmail(email);
        setStep(2); // Move to OTP step
    };

    const handleOtpSubmit = (otp) => {
        setOtp(otp);
        setStep(3); 
    };

    const handlePasswordReset = (password) => {
        setPassword(password);
        setStep(0); 
    };

    const handleForgotPassword = () => {
        setStep(1); // Open Email Modal
    };

    const handleClose = () => {
        setStep(0); 
    };

    const handleSignIn = () => {
        // Add any sign-in logic if needed, such as validation or API calls

        // After successful sign-in, navigate to the dashboard
        navigate('/dashboard');
    };

    return (
        <div className='main-container'>
            <div className="login-container">
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                    <h2 className='login-head'><FaAngleLeft /> Login </h2>
                    <label htmlFor="email" className='login-label'>Email</label>
                    <input
                        type="email"
                        id="email"
                        className='login-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className='login-label'>Password</label>
                    <input
                        type="password"
                        id="password"
                        className='login-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className='login-btn'>Sign In</button>
                    {/* <div className='modal-sign-btn'>
                        <button type="button" className='forgot-password-btn' onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div> */}
                </form>
            </div>
            {step === 1 && (
                <EmailModal 
                    isOpen={step === 1}
                    onHide={handleClose}
                    onEmailSubmit={handleEmailSubmit}
                />
            )}
            {step === 2 && (
                <OtpModal 
                    isOpen={step === 2}
                    onHide={handleClose}
                    onOtpSubmit={handleOtpSubmit}
                />
            )}
            {step === 3 && (
                <ChangePasswordModal 
                    isOpen={step === 3}
                    onHide={handleClose}
                    onPasswordReset={handlePasswordReset}
                />
            )}
        </div>
    );
};

export default Login;



// import React, { useState } from 'react';
// import { FaAngleLeft } from "react-icons/fa6";
// import EmailModal from './EmailModal';
// import OtpModal from './OtpModal';
// import { useNavigate } from 'react-router-dom';
// import ChangePasswordModal from './ChangePasswordModal';
// import './Login.css'; 
// import { SuperAdminLoginAPI } from '../../../utils/APIs/credentialsApis';
// import { toast } from 'react-toastify';

// const Login = () => {
//     const [step, setStep] = useState(0);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false); // Loading state
//     const navigate = useNavigate();

//     const handleEmailSubmit = (email) => {
//         setEmail(email);
//         setStep(2); // Move to OTP step
//     };

//     const handleOtpSubmit = (otp) => {
//         setStep(3); 
//     };

//     const handlePasswordReset = (password) => {
//         setStep(0); 
//     };

//     const handleForgotPassword = () => {
//         setStep(1); // Open Email Modal
//     };

//     const handleClose = () => {
//         setStep(0); 
//     };

//     const validateInputs = () => {
//         let isValid = true;

//         if (!email) {
//             toast.error('Email is required');
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             toast.error('Please enter a valid email');
//             isValid = false;
//         }

//         if (!password) {
//             toast.error('Password is required');
//             isValid = false;
//         } else if (password.length < 6) {
//             toast.error('Password must be at least 6 characters');
//             isValid = false;
//         }

//         return isValid;
//     };

//     const handleSignIn = async () => {
//         if (!validateInputs()) {
//             return; // Don't proceed if validation fails
//         }

//         try {
//             setLoading(true);

//             // API Call
//             const loginData = { email, password };
//             const response = await SuperAdminLoginAPI(loginData); // Call the login API

//             setLoading(false);

//             if (
//                 response &&
//                 response.data &&
//                 response.data.response &&
//                 response.data.response.response === true
//             ) {
//                 toast.success('Login successful!');
//                 // After successful sign-in, navigate to the dashboard
//                 navigate('/dashboard');
//             } else {
//                 toast.error(response?.data?.response?.error_msg || 'Login failed, please try again.');
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error('Error logging in:', error);
//             toast.error('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className='main-container'>
//             <div className="login-container">
//                 <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
//                     <h2 className='login-head'><FaAngleLeft /> Login </h2>
//                     <label htmlFor="email" className='login-label'>Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         className='login-input'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <label htmlFor="password" className='login-label'>Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className='login-input'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit" className='login-btn' disabled={loading}>
//                         {loading ? 'Signing in...' : 'Sign In'}
//                     </button>
//                 </form>
//             </div>

//             {step === 1 && (
//                 <EmailModal 
//                     isOpen={step === 1}
//                     onHide={handleClose}
//                     onEmailSubmit={handleEmailSubmit}
//                 />
//             )}
//             {step === 2 && (
//                 <OtpModal 
//                     isOpen={step === 2}
//                     onHide={handleClose}
//                     onOtpSubmit={handleOtpSubmit}
//                 />
//             )}
//             {step === 3 && (
//                 <ChangePasswordModal 
//                     isOpen={step === 3}
//                     onHide={handleClose}
//                     onPasswordReset={handlePasswordReset}
//                 />
//             )}
//         </div>
//     );
// };

// export default Login;
