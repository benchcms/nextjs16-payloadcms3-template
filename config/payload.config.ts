// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Events } from "./collections/Events";
import { FAQItems } from "./collections/FAQItems";
import { FAQGroups } from "./collections/FAQGroups";
import { JobOffers } from "./collections/JobOffers";
import { Galleries } from "./collections/Galleries";
import { TeamItems } from "./collections/TeamItems";
import { TeamGroups } from "./collections/TeamGroups";
import { Testimonials } from "./collections/Testimonials";
import { PressReleases } from "./collections/PressReleases";
import { BlogCategories } from "./collections/BlogCategories";
import { BlogPosts } from "./collections/BlogPosts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Events,
    FAQItems,
    FAQGroups,
    JobOffers,
    Galleries,
    TeamItems,
    TeamGroups,
    Testimonials,
    PressReleases,
    BlogCategories,
    BlogPosts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
