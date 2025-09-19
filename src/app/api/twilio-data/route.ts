import { NextResponse } from "next/server";
import Twilio from "twilio";
// import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
// import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';



const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

const client = Twilio(accountSid, authToken);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Accept multiple query params named number, collect into array
    const numbers = searchParams.getAll("number"); // array of numbers, e.g. ['+1234', '+5678']

    // Function to create a filter object for Twilio API calls/messages
    // Twilio API doesn't support OR filters across 'from' and 'to' together,
    // so here for simplicity, we fetch data filtered either by 'to' or by 'from' individually,
    // then merge results. This can be optimized later.

    async function fetchCallsForNumbers(nums: string[]) {
      // const callsSet = new Map<string, CallInstance>();
        
      // for (const num of nums) {
      //   // Fetch calls where 'to' is this number
      //   const toCalls = await client.calls.list({ to: num, limit: 20 });
      //   toCalls.forEach(call => callsSet.set(call.sid, call));

      //   // Fetch calls where 'from' is this number
      //   const fromCalls = await client.calls.list({ from: num, limit: 20 });
      //   fromCalls.forEach(call => callsSet.set(call.sid, call));
      // }
      // return Array.from(callsSet.values());
    }

    async function fetchMessagesForNumbers(nums: string[]) {
      // const messagesSet = new Map<string, MessageInstance>();
      // for (const num of nums) {
      //   const toMessages = await client.messages.list({ to: num, limit: 20 });
      //   toMessages.forEach(msg => messagesSet.set(msg.sid, msg));
      //   const fromMessages = await client.messages.list({ from: num, limit: 20 });
      //   fromMessages.forEach(msg => messagesSet.set(msg.sid, msg));
      // }
      // return Array.from(messagesSet.values());
    }

    // Fetch calls & messages filtered by numbers or fallback to unfiltered (latest 20)
    const calls = numbers.length > 0 ? await fetchCallsForNumbers(numbers) : await client.calls.list({ limit: 20 });
    const messages = numbers.length > 0 ? await fetchMessagesForNumbers(numbers) : await client.messages.list({ limit: 20 });

    // Usage records are account wide, so no number filter
    const usageRecords = await client.usage.records.list({ limit: 20 });

    // Fetch recordings and transcriptions unfiltered, or optionally you can filter recordings by callSid present in filtered calls

    // Map calls by sid for filtering recordings and transcriptions
    // const callSidSet = new Set(calls.map(c => c.sid));

    // const recordingsAll = await client.recordings.list({ limit: 50 });
    // const recordings = recordingsAll.filter(rec => callSidSet.has(rec.callSid));

    // // Map recordings by sid for joining with transcriptions
    // const recordingsMap = new Map(recordings.map((r) => [r.sid, r]));

    // const transcriptionsAll = await client.transcriptions.list({ limit: 50 });
    // const transcriptions = transcriptionsAll.filter(tr => recordingsMap.has(tr.recordingSid));

    // // Format data

    // const callsData = calls.map((call) => ({
    //   sid: call.sid,
    //   from: call.from,
    //   to: call.to,
    //   status: call.status,
    //   startTime: call.startTime,
    //   duration: call.duration,
    // }));

    // const messagesData = messages.map((msg) => ({
    //   sid: msg.sid,
    //   from: msg.from,
    //   to: msg.to,
    //   status: msg.status,
    //   body: msg.body,
    //   dateSent: msg.dateSent,
    //   direction: msg.direction,
    // }));

    // const usageData = usageRecords.map((record) => ({
    //   category: record.category,
    //   usage: record.usage,
    //   price: record.price,
    //   startDate: record.startDate,
    //   endDate: record.endDate,
    // }));

    // const recordingsData = recordings.map((rec) => ({
    //   sid: rec.sid,
    //   callSid: rec.callSid,
    //   dateCreated: rec.dateCreated,
    //   duration: rec.duration,
    // }));

    // const transcriptionsData = transcriptions.map((trans) => {
    //   const recording = recordingsMap.get(trans.recordingSid);
    //   return {
    //     sid: trans.sid,
    //     recordingSid: trans.recordingSid,
    //     callSid: recording?.callSid ?? null,
    //     transcriptionText: trans.transcriptionText,
    //     status: trans.status,
    //     dateCreated: trans.dateCreated,
    //   };
    // });

    return NextResponse.json({
      // calls: callsData,
      // messages: messagesData,
      // usage: usageData,
      // recordings: recordingsData,
      // transcriptions: transcriptionsData,
    });
  } catch (error) {
    console.error("Twilio API fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch Twilio data" }, { status: 500 });
  }
}