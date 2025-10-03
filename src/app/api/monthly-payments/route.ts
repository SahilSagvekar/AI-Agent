    // app/api/monthly-payments/route.ts
    import { NextRequest, NextResponse } from 'next/server';
    import Stripe from 'stripe';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    export async function POST(req: NextRequest) {
  try {
    const { customerId, year, month } = await req.json();

    if (!customerId || !year || !month) {
      return NextResponse.json(
        { error: "Missing customerId, year, or month" },
        { status: 400 }
      );
    }

    // Fetch invoices for the customer
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 100,
    });

    let nextBillingDate =  new Date(invoices.data[0].lines.data[0].period.end * 1000);

    // Filter invoices by year, month, and paid status
    const filteredInvoices = invoices.data.filter((invoice) => {
      const invoiceDate = new Date(invoice.created * 1000);
      return (
        invoice.status === "paid" &&
        invoiceDate.getUTCFullYear() === Number(year) &&
        invoiceDate.getUTCMonth() + 1 === Number(month)
      );
    });

    // Fetch subscriptions for the customer (to get next billing date)
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 100,
      status: "all",
    });

    // Map subscriptions by id for quick lookup
    const subscriptionMap = new Map();
    subscriptions.data.forEach((sub) => {
      subscriptionMap.set(sub.id, sub);
    });

    // Process invoices to extract required info including next billing date from subscription
    const processedInvoices = filteredInvoices.map((invoice) => {
      const paymentDate = invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
        : null;

      // Retrieve subscription from its ID on invoice, get next billing date      
    //   const subscriptionId = invoice.subscription;
      
    //   let nextBillingDate = null;
    //   if (subscriptionId && subscriptionMap.has(subscriptionId)) {
    //     const sub = subscriptionMap.get(subscriptionId);
    //     nextBillingDate = sub.current_period_end
    //       ? new Date(sub.current_period_end * 1000).toISOString()
    //       : null;
    //   }

      // Calculate total number of locations by counting line items with "location" keyword
      const totalLocations =
        invoice.lines?.data.filter((line) =>
          line.description?.toLowerCase().includes("location")
        ).length || 0;

      // Extract amounts and descriptions of paid line items
      const lineItems =
        invoice.lines?.data.map((line) => ({
          description: line.description,
          amount_paid: line.amount,
        })) || [];

      return {
        invoiceId: invoice.id,
        status: invoice.status,
        amount_paid: invoice.amount_paid,
        currency: invoice.currency,
        paymentDate,
        nextBillingDate,
        totalLocations,
        lineItems,
      };
    });

    return NextResponse.json({ invoices: processedInvoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

