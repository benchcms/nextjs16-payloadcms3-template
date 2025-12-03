import { Feature } from "../index";
import { ContactEmails } from "./collections/ContactEmails";
import { Contact } from "./globals/Contact";
import { seedContact } from "./seed/contact";

const feature: Feature = {
  globals: [Contact],
  collections: [ContactEmails],
  seeds: [seedContact],
};

export default feature;
