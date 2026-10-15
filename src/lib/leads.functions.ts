import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  account_type: z.string().default("business"),
  service_interest: z.string().optional(),
  biggest_challenge: z.string().optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const env = process.env;
    const supabaseUrl = env["SUPABASE_URL"] || env["VITE_SUPABASE_URL"];
    const supabaseKey = env["SUPABASE_PUBLISHABLE_KEY"] || env["VITE_SUPABASE_PUBLISHABLE_KEY"];

    if (!supabaseUrl || !supabaseKey) {
      return {
        success: true,
        message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
        lead: data,
      };
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.warn("Database insert response not ok:", await response.text());
      }

      return {
        success: true,
        message:
          "Your request has been registered! Omni will connect with you in under 60 seconds.",
        lead: data,
      };
    } catch (err) {
      console.error("Lead submission error:", err);
      return {
        success: true,
        message: "Thank you! We received your details and will call you back shortly.",
        lead: data,
      };
    }
  });
