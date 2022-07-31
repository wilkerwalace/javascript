import { TOTPFactor } from '@clerk/types';
import React from 'react';

import { Flow } from '../customizables';
import { SignInFactorTwoCodeCard, SignInFactorTwoCodeForm } from './SignInFactorTwoCodeForm';

type SignInFactorTwoTOTPCardProps = SignInFactorTwoCodeCard & { factor: TOTPFactor };

export const SignInFactorTwoTOTPCard = (props: SignInFactorTwoTOTPCardProps) => {
  return (
    <Flow.Part part='totp2Fa'>
      <SignInFactorTwoCodeForm
        {...props}
        cardTitle='Two-step authentication'
        cardSubtitle={''}
        formTitle='Verification code'
        formSubtitle='Enter the verification code generated by your authenticator app'
      />
    </Flow.Part>
  );
};
