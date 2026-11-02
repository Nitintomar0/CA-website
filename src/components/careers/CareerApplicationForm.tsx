"use client";

import { FileText, Upload, X } from "lucide-react";
import { type ChangeEvent, type DragEvent, type FormEvent, useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type ApplicationValues = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  area: string;
  qualification: string;
  experience: string;
  linkedin: string;
  introduction: string;
  consent: boolean;
};

type ApplicationErrors = Partial<Record<keyof ApplicationValues | "resume", string>>;

const initialValues: ApplicationValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  area: "",
  qualification: "",
  experience: "",
  linkedin: "",
  introduction: "",
  consent: false,
};

function fileError(file: File) {
  if (!ACCEPTED_TYPES.includes(file.type)) return "Please choose a PDF, DOC, or DOCX file.";
  if (file.size > MAX_FILE_SIZE) return "Please choose a file smaller than 5 MB.";
  return "";
}

function validate(values: ApplicationValues, resume: File | null): ApplicationErrors {
  const errors: ApplicationErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!/^\+?[0-9()\s-]{7,20}$/.test(values.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!values.city.trim()) errors.city = "Please enter your current city.";
  if (!values.area) errors.area = "Please select an area of interest.";
  if (!values.qualification.trim()) errors.qualification = "Please enter your qualification.";
  if (!values.experience) errors.experience = "Please select your work experience.";
  if (values.linkedin.trim()) {
    try {
      const profile = new URL(values.linkedin);
      if (!/(^|\.)linkedin\.com$/i.test(profile.hostname)) errors.linkedin = "Please enter a valid LinkedIn profile URL.";
    } catch {
      errors.linkedin = "Please enter a valid LinkedIn profile URL.";
    }
  }
  if (!resume) errors.resume = "Please attach your resume or CV.";
  if (!values.introduction.trim()) errors.introduction = "Please add a brief introduction.";
  if (!values.consent) errors.consent = "Please confirm your consent before continuing.";
  return errors;
}

export function CareerApplicationForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<ApplicationValues>(initialValues);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [resume, setResume] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "not-enabled">("idle");

  const updateValue = <Key extends keyof ApplicationValues>(key: Key, value: ApplicationValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmissionState("idle");
  };

  const chooseFile = (file: File | undefined) => {
    if (!file) return;
    const nextError = fileError(file);
    if (nextError) {
      setResume(null);
      setErrors((current) => ({ ...current, resume: nextError }));
      return;
    }
    setResume(file);
    setErrors((current) => ({ ...current, resume: undefined }));
    setSubmissionState("idle");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => chooseFile(event.target.files?.[0]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  };

  const removeResume = () => {
    setResume(null);
    if (inputRef.current) inputRef.current.value = "";
    setErrors((current) => ({ ...current, resume: undefined }));
    setSubmissionState("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, resume);
    setErrors(nextErrors);
    setSubmissionState(Object.keys(nextErrors).length ? "idle" : "not-enabled");
  };

  return (
    <form className="career-form" noValidate onSubmit={handleSubmit}>
      <div className="career-form__heading">
        <p className="eyebrow">Expression of interest</p>
        <h2>Let&apos;s Start a Conversation.</h2>
        <p>Tell us a little about yourself and your professional interests.</p>
      </div>

      <fieldset className="career-form__group">
        <legend>Personal information</legend>
        <div className="career-form__grid career-form__grid--two">
          <Field label="Full name" error={errors.fullName} required><input id="career-name" name="fullName" autoComplete="name" value={values.fullName} onChange={(event) => updateValue("fullName", event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "career-name-error" : undefined} /></Field>
          <Field label="Email address" error={errors.email} required><input id="career-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "career-email-error" : undefined} /></Field>
          <Field label="Phone number" error={errors.phone} required><input id="career-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "career-phone-error" : undefined} /></Field>
          <Field label="Current city" error={errors.city} required><input id="career-city" name="city" autoComplete="address-level2" value={values.city} onChange={(event) => updateValue("city", event.target.value)} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "career-city-error" : undefined} /></Field>
        </div>
      </fieldset>

      <fieldset className="career-form__group">
        <legend>Professional information</legend>
        <div className="career-form__grid career-form__grid--two">
          <Field label="Position / area of interest" error={errors.area} required><select id="career-area" name="area" value={values.area} onChange={(event) => updateValue("area", event.target.value)} aria-invalid={Boolean(errors.area)} aria-describedby={errors.area ? "career-area-error" : undefined}><option value="">Select an area</option><option>Accounting &amp; Bookkeeping</option><option>Direct Tax Advisory</option><option>GST &amp; Indirect Tax</option><option>Audit &amp; Assurance</option><option>Corporate &amp; Secretarial</option><option>Risk &amp; Business Advisory</option><option>Other</option></select></Field>
          <Field label="Qualification" error={errors.qualification} required><input id="career-qualification" name="qualification" value={values.qualification} onChange={(event) => updateValue("qualification", event.target.value)} aria-invalid={Boolean(errors.qualification)} aria-describedby={errors.qualification ? "career-qualification-error" : undefined} /></Field>
          <Field label="Work experience" error={errors.experience} required><select id="career-experience" name="experience" value={values.experience} onChange={(event) => updateValue("experience", event.target.value)} aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? "career-experience-error" : undefined}><option value="">Select experience</option><option>Fresher</option><option>0–2 Years</option><option>2–5 Years</option><option>5+ Years</option></select></Field>
          <Field label="LinkedIn profile" error={errors.linkedin}><input id="career-linkedin" name="linkedin" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/your-name" value={values.linkedin} onChange={(event) => updateValue("linkedin", event.target.value)} aria-invalid={Boolean(errors.linkedin)} aria-describedby={errors.linkedin ? "career-linkedin-error" : undefined} /></Field>
        </div>
      </fieldset>

      <div className="career-form__group">
        <p className="career-form__legend">Resume / CV <em>Required</em></p>
        <div className={`career-upload ${isDragging ? "is-dragging" : ""} ${errors.resume ? "has-error" : ""}`} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}>
          <input ref={inputRef} id="career-resume" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
          {resume ? <><FileText aria-hidden="true" size={24} /><div><strong>{resume.name}</strong><span>{(resume.size / 1024 / 1024).toFixed(2)} MB · ready for future submission</span></div><button type="button" onClick={removeResume} aria-label="Remove selected resume"><X aria-hidden="true" size={18} /></button></> : <><Upload aria-hidden="true" size={24} /><div><strong>Drag your file here, or <button type="button" onClick={() => inputRef.current?.click()}>browse your device</button></strong><span>PDF, DOC or DOCX · maximum file size 5 MB</span></div></>}
        </div>
        {errors.resume ? <p className="career-form__error" role="alert">{errors.resume}</p> : null}
      </div>

      <div className="career-form__group">
        <Field label="Tell us about yourself" error={errors.introduction} required><textarea id="career-introduction" name="introduction" rows={6} value={values.introduction} onChange={(event) => updateValue("introduction", event.target.value)} aria-invalid={Boolean(errors.introduction)} aria-describedby={errors.introduction ? "career-introduction-error" : undefined} /></Field>
      </div>

      <div className="career-form__actions">
        <label className={`career-consent ${errors.consent ? "has-error" : ""}`}><input type="checkbox" name="consent" checked={values.consent} onChange={(event) => updateValue("consent", event.target.checked)} /><span>I consent to the handling of the information in this form for recruitment-related enquiries, subject to the firm&apos;s applicable privacy practices.</span></label>
        {errors.consent ? <p className="career-form__error" role="alert">{errors.consent}</p> : null}
        <button className="career-form__submit" type="submit">Prepare application <span aria-hidden="true">↗</span></button>
        <p className="career-form__status" aria-live="polite">{submissionState === "not-enabled" ? "Your application form is ready. Online submissions will be enabled soon. Please contact our team for current application enquiries." : "This form is prepared for a future secure application workflow. It does not send or store your information."}</p>
      </div>
    </form>
  );
}

function Field({ label, error, required = false, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  const child = children as React.ReactElement<{ id?: string }>;
  const errorId = child.props.id ? `${child.props.id}-error` : undefined;
  return <label className="career-field">{label}{required ? <em>Required</em> : <em>Optional</em>}{children}{error ? <span id={errorId} className="career-form__error" role="alert">{error}</span> : null}</label>;
}
