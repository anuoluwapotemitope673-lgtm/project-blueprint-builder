// Single place to edit contact details and profile links.
export const SITE = {
  name: "Mercy Digital Agency",
  email: "mercydigitalagency1@gmail.com",
  whatsappNumberDisplay: "0816 324 2998",
  whatsappIntl: "2348163242998",
  whatsappGreeting:
    "Hello Mercy Digital Agency, I visited your website and would like to discuss a project with you.",
  // Add real profile URLs here when available; empty entries are hidden.
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
  ],
};

export const mailtoHref = (subject?: string) =>
  `mailto:${SITE.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const whatsappHref = (message: string = SITE.whatsappGreeting) =>
  `https://wa.me/${SITE.whatsappIntl}?text=${encodeURIComponent(message)}`;
