"use client"; // use React client component

import { useEffect, useState } from "react";

type Call = {
  from: string | null;
  to: string | null;
  status: string;
  startTime: string | null;
  duration: string | null;
};

type Message = {
  from: string | null;
  to: string | null;
  status: string;
  body: string | null;
  dateSent: string | null;
  direction: string;
};

type UsageRecord = {
  category: string;
  usage: string;
  price: string;
  startDate: string;
  endDate: string;
};

export default function TwilioDashboard() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [usage, setUsage] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchTwilioData() {
      try {
        const res = await fetch("/api/twilio-data");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setCalls(data.calls || []);
        setMessages(data.messages || []);
        setUsage(data.usage || []);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }
    fetchTwilioData();
  }, []);

  if (loading) return <p>Loading Twilio Data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Twilio Dashboard Data</h1>

      <section>
        <h2>Recent Calls</h2>
        {calls.length === 0 && <p>No calls found</p>}
        <ul>
          {calls.map((call, index) => (
            <li key={index}>
              From: {call.from ?? "N/A"} - To: {call.to ?? "N/A"} - Status: {call.status} - Start: {call.startTime} - Duration: {call.duration}s
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent Messages</h2>
        {messages.length === 0 && <p>No messages found</p>}
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              From: {msg.from ?? "N/A"} - To: {msg.to ?? "N/A"} - Status: {msg.status} - Sent: {msg.dateSent} - Direction: {msg.direction} - Body: {msg.body?.substring(0,50)}...
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Usage Records</h2>
        {usage.length === 0 && <p>No usage records found</p>}
        <ul>
          {usage.map((u, index) => (
            <li key={index}>
              Category: {u.category} - Usage: {u.usage} - Price: ${u.price} - From: {u.startDate} To: {u.endDate}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
