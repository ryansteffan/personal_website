"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
      <div className="mt-32" />
      {/* <UnderConstruction /> */}
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
                  <Input placeholder="example@example.com" {...field} />
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
                  <Input placeholder="Your Name" {...field} />
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
                  <Textarea placeholder="Your message for me..." {...field} />
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
                <FormLabel>
                  Do you agree to share your contact details?
                </FormLabel>
                <FormControl>
                  <Checkbox
                    id="consent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <p>
                  {showConsentMessage &&
                    "You must consent to sharing your contact details before sending a message."}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
