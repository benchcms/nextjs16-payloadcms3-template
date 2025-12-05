import { Feature } from "../config";
import { ContactEmails } from "./collections/ContactEmails";
import { Contact } from "./globals/Contact";
import { seedContact } from "./seed/contact";

export const contactConfig: Feature = {
  globals: [Contact],
  collections: [ContactEmails],
  seeds: [seedContact],
};
