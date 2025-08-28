// // pages/api/saveForm.ts
// import { NextApiRequest, NextApiResponse } from "next";

// // Example in-memory DB (replace with real DB logic)
// let database: any[] = [];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const formData = req.body;

//       // TODO: Replace this with your real DB logic
//       database.push(formData);

//       res.status(200).json({ message: "Form saved successfully!", data: formData });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Failed to save form" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
