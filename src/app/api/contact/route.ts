import contactFormScheme from "~/lib/contact_form_scheme";
import { type z, ZodError } from "zod";
import * as nodemailer from "nodemailer";
import { env } from "~/env";

export async function POST(request: Request) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "josefa.hodkiewicz@ethereal.email",
      pass: "ncCVAhPX3KmFsKs5Bm",
    },
  });

  try {
    const data: z.infer<typeof contactFormScheme> = contactFormScheme.parse(
      await request.json(),
    );

    if (data.consent == false) {
      return new Response(
        "You must consent to share contact details if you wish to send a message.",
        { status: 400 },
      );
    }

    console.log(`Message Received: ${JSON.stringify(data)}`);

    const info = await transporter.sendMail({
      from: "josefa.hodkiewicz@ethereal.email",
      to: env.CONTACT_EMAIL,
      subject: `My Website Contact || ${data.name}`,
      text: `From: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    });

    console.log(info);

    return new Response("Success!", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid Request!", { status: 400 });
    } else {
      return new Response("There was an unknown error with the request!", {
        status: 500,
      });
    }
  }
}
