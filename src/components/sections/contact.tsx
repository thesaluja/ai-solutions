"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin } from "lucide-react";
import { SectionReveal, BlurReveal } from "@/components/motion";
import { Button, Input, Textarea } from "@/components/ui";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const prefersReduced = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const subject = encodeURIComponent(`Project inquiry${data.company ? ` from ${data.company}` : ""}`);
    const body = encodeURIComponent(`Name: ${data.name}\nCompany: ${data.company ?? "—"}\n\n${data.message}`);
    window.location.href = `mailto:hey@aisolutions.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 4000);
  };

  return (
    <SectionReveal id="contact" className="relative py-32 md:py-40">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <BlurReveal>
              <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
                Contact
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Let's build something{" "}
                <span className="text-gradient">remarkable</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Tell us about your challenge. We'll respond within 24 hours
                with a thoughtful assessment, not a generic sales response.
              </p>
            </BlurReveal>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{SITE.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">{SITE.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <BlurReveal>
              {submitted ? (
                <motion.div
                  className="border border-accent/20 rounded-2xl bg-accent/[0.03] p-12 text-center"
                  initial={prefersReduced ? false : { scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Message Received
                  </h3>
                  <p className="text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 p-8 rounded-2xl border border-white/5 bg-card/20"
                >
                  <div>
                    <Input
                      placeholder="Your name"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your email"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Company (optional)"
                      {...register("company")}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell us about your project..."
                      {...register("message")}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="w-full group">
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </Button>
                </form>
              )}
            </BlurReveal>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}