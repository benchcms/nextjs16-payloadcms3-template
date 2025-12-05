import { Payload } from "payload";

export const seedSocials = async (payload: Payload) => {
  await payload.updateGlobal({
    slug: "socials",
    data: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  });
};
