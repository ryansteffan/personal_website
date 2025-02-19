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

export default function ContactPage(): React.ReactNode {
  const [showConsentMessage, setShowConsentMessage] = useState(false);

  async function onSubmit(data: z.infer<typeof contactFormScheme>) {
    console.log(data);
    if (data.consent === false) {
      setShowConsentMessage(true);
    } else {
      setShowConsentMessage(false);
      await axios.post("/api/contact", data);
      console.log("The message was sent.");
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
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-500"
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
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-blue-500"
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none border-blue-500"
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
                  <div className="flex flex-col rounded-md border border-blue-500 pb-3 pl-2 pr-2 pt-3">
                    <div className="flex">
                      <FormLabel className="pr-2">
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
