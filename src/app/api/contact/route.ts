import contactFormScheme from "~/lib/contact_form_scheme";
import { type z, ZodError } from "zod";

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

    console.log(data);

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
