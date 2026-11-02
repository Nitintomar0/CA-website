"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/site";

type FormValues = { name: string; email: string; phone: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", phone: "", subject: "", message: "" };

// The UI deliberately keeps transport separate. An EmailJS or backend adapter can
// replace this function later without changing validation or form state.
async function submitEnquiry(): Promise<"not-configured"> {
  return "not-configured";
}

export function EnquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "not-configured">("idle");

  function validate() {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    const phoneDigits = values.phone.replace(/\D/g, "");
    if (values.phone.trim() && (phoneDigits.length < 7 || phoneDigits.length > 15)) nextErrors.phone = "Please enter a valid phone number, including country code if needed.";
    if (!values.message.trim()) nextErrors.message = "Please add a brief message.";
    return nextErrors;
  }

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submissionState !== "idle") setSubmissionState("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionState === "submitting") return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setSubmissionState("idle");
      return;
    }

    setSubmissionState("submitting");
    const result = await submitEnquiry();
    setSubmissionState(result);
  }

  return (
    <form className="enquiry-form" noValidate onSubmit={handleSubmit}>
      <div className="enquiry-form__field">
        <label htmlFor="enquiry-name">Your name</label>
        <input id="enquiry-name" name="name" autoComplete="name" required value={values.name} onChange={(event) => updateValue("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "enquiry-name-error" : undefined} />
        {errors.name ? <p id="enquiry-name-error" className="enquiry-form__error">{errors.name}</p> : null}
      </div>
      <div className="enquiry-form__field">
        <label htmlFor="enquiry-email">Email address</label>
        <input id="enquiry-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "enquiry-email-error" : undefined} />
        {errors.email ? <p id="enquiry-email-error" className="enquiry-form__error">{errors.email}</p> : null}
      </div>
      <div className="enquiry-form__field">
        <label htmlFor="enquiry-phone">Phone number <span>(optional)</span></label>
        <input id="enquiry-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "enquiry-phone-error" : undefined} />
        {errors.phone ? <p id="enquiry-phone-error" className="enquiry-form__error">{errors.phone}</p> : null}
      </div>
      <div className="enquiry-form__field">
        <label htmlFor="enquiry-subject">Service of interest <span>(optional)</span></label>
        <select id="enquiry-subject" name="subject" value={values.subject} onChange={(event) => updateValue("subject", event.target.value)}>
          <option value="">Select a service</option>
          {services.map((service) => <option value={service.title} key={service.slug}>{service.title}</option>)}
          <option value="General enquiry">General enquiry</option>
        </select>
      </div>
      <div className="enquiry-form__field">
        <label htmlFor="enquiry-message">How can we help?</label>
        <textarea id="enquiry-message" name="message" rows={5} required value={values.message} onChange={(event) => updateValue("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "enquiry-message-error" : undefined} />
        {errors.message ? <p id="enquiry-message-error" className="enquiry-form__error">{errors.message}</p> : null}
      </div>
      <button className="button button--primary" type="submit" disabled={submissionState === "submitting"}>
        {submissionState === "submitting" ? "Preparing enquiry…" : "Send enquiry"}
      </button>
      <p className="enquiry-form__status" aria-live="polite" role="status">
        {submissionState === "not-configured" ? "Your enquiry has not been sent: secure delivery is not configured yet. Please use the verified phone contact above." : "Fields marked without “optional” are required."}
      </p>
    </form>
  );
}
