import contactFormScheme from "~/lib/contact_form_scheme";
import { type z, ZodError } from "zod";
import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";
import { env } from "~/env";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

export async function POST(request: Request) {
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

    const window = new JSDOM("").window;
    const purify = DOMPurify(window);
    const name = purify.sanitize(data.name);
    const email = purify.sanitize(data.email);
    const message = purify.sanitize(data.message);

    console.log(`Message Received: ${JSON.stringify(data)}`);

    const connectionString = env.COMMUNICATION_SERVICES_CONNECTION_STRING;
    const mailClient = new EmailClient(connectionString);

    const contactMessage = {
      senderAddress: "<DoNotReply@mail.ryansteffan.com>",
      content: {
        subject: `New Website Message || FROM: ${name}`,
        plainText: message,
      },
      recipients: {
        to: [
          {
            address: env.CONTACT_EMAIL,
            displayName: "Ryan",
          },
        ],
      },
    };

    const confirmationMessage = {
      senderAddress: "<DoNotReply@mail.ryansteffan.com>",
      content: {
        subject: `Thanks for reaching out...`,
        plainText:
          "This is an email confirming that your message was sent to Ryan, he will get back to you as soon as possible.",
      },
      recipients: {
        to: [
          {
            address: email,
            displayName: name,
          },
        ],
      },
    };

    await SendMail(mailClient, contactMessage);
    SendMail(mailClient, confirmationMessage).catch(() => {
      throw Error("Failed to send confirmation.");
    });

    return new Response("Success!", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid Request!", { status: 400 });
    } else {
      return new Response(
        `There was an unknown error with the request: ${String(error)}`,
        {
          status: 500,
        },
      );
    }
  }
}

async function SendMail(
  mailClient: EmailClient,
  contactMessage: {
    senderAddress: string;
    content: { subject: string; plainText: string };
    recipients: { to: { address: string; displayName: string }[] };
  },
) {
  const poller = await mailClient.beginSend(contactMessage);

  if (!poller.getOperationState().isStarted) {
    throw Error("Poller was not started.");
  }

  let timeElapsed = 0;
  const POLLER_WAIT_TIME = 10;

  while (!poller.isDone()) {
    await poller.poll();
    console.log("Email send polling in progress");

    await new Promise((resolve) =>
      setTimeout(resolve, POLLER_WAIT_TIME * 1000),
    );
    timeElapsed += 10;

    if (timeElapsed > 18 * POLLER_WAIT_TIME) {
      throw Error("Polling timed out.");
    }
  }

  if (poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
    console.log(
      `Successfully sent the email (operation id: ${poller.getResult()?.id})`,
    );
  } else {
    throw Error(poller.getResult()?.error?.message);
  }
}
