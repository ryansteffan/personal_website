"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import contactFormScheme from "~/lib/contact_form_scheme";
import axios from "axios";
import { useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";

export default function ContactPage(): React.ReactNode {
  const [showConsentMessage, setShowConsentMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof contactFormScheme>) {
    if (data.consent === false) {
      setShowConsentMessage(true);
    } else {
      setShowConsentMessage(false);
      setShowLoader(true);
      const result = (await axios.post("/api/contact", data)).status;
      if (result === 200) {
        router.push("/contact/success");
      } else {
      }
    }
  }

  const form = useForm<z.infer<typeof contactFormScheme>>({
    resolver: zodResolver(contactFormScheme),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      consent: false,
    },
  });

  return (
    <>
      <div className="mt-24" />
      {/* <UnderConstruction /> */}
      <div className="mx-auto my-10 w-2/3 max-w-4xl overflow-auto rounded-md bg-slate-700 bg-opacity-40 p-10 text-black shadow-sm shadow-black dark:text-white">
        <h2 className="pb-4 font-sans text-4xl font-semibold tracking-tight">
          Contact Me
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            action="api/contact"
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={showLoader ? "hidden" : ""}>
                    Your Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={showLoader ? "hidden" : "border-blue-500"}
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={showLoader ? "hidden" : ""}>
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={showLoader ? "hidden" : "border-blue-500"}
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={showLoader ? "hidden" : ""}>
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className={
                        showLoader
                          ? "hidden"
                          : "h-36 resize-none border-blue-500"
                      }
                      placeholder="Your message for me..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem>
                  <div
                    className={
                      showLoader
                        ? "hidden"
                        : "flex flex-col rounded-md border border-blue-500 pb-3 pl-2 pr-2 pt-3"
                    }
                  >
                    <div className="flex">
                      <FormLabel className={showLoader ? "hidden" : "pr-2"}>
                        I agree for my contact information to be shared.
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          id="consent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <p className="pt-1 text-sm text-destructive">
                      {showConsentMessage &&
                        "You must consent to sharing your contact details before sending a message."}
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={showLoader ? "flex justify-center" : "flex"}>
              <Button className={showLoader ? "hidden" : ""} type="submit">
                Submit
              </Button>
              {showLoader && (
                <div role="status" className="relative mr-4">
                  <svg
                    aria-hidden="true"
                    className="h-10 w-10 animate-spin fill-blue-600 text-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
