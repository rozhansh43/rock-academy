'use client';
import { useState } from 'react';
import { PhoneStep } from './_components/phone-step';
import { OtpStep } from './_components/otp-step';

export enum LOGIN_STEPS {
  PHONE = 'phone',
  OTP = 'otp',
}

export default function Page() {
  const [step, setStep] = useState<LOGIN_STEPS>(LOGIN_STEPS.PHONE);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [sendData, setSendData] = useState<any>(null);

  return (
    <>
      {step === LOGIN_STEPS.PHONE && (
        <PhoneStep
          setStep={setStep}
          setPhoneNumber={setPhoneNumber}
          setSendData={setSendData}
        />
      )}
      {step === LOGIN_STEPS.OTP && (
        <OtpStep
          setStep={setStep}
          phoneNumber={phoneNumber}
          sendData={sendData}
          setSendData={setSendData}
        />
      )}
    </>
  );
}
