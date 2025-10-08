// utils/twilioRecording.ts
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function startTwilioRecording(callSid: string) {
  return client.calls(callSid).recordings.create({
    recordingChannels: 'dual',
    recordingStatusCallback: "https://tryconnect.ai/api/twilio/recording", // Replace with your real endpoint
  });
}
