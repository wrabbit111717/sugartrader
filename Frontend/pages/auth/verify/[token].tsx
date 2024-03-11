import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiService from "@service/apiService";

import { URL_AUTH_VERIFYEMAIL } from "@util/urls";

const verifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('');

  console.log('here')
  useEffect(() => {
    const verify = async () => {
      try {
        // Replace 'YOUR_VERIFICATION_API_ENDPOINT' with your actual API endpoint

        const response = await apiService.get(`${URL_AUTH_VERIFYEMAIL}/${token}`);
        console.log(response, 'response');
        // Handle the response from the server
      } catch (error) {
        console.log(error, 'error');
      }
    };

    // Call the verifyEmail function when the component mounts
    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Status: {verificationStatus}</p>
    </div>
  );
};

export default verifyEmail;