import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { en } from "payload/i18n/en";
import { fr } from "payload/i18n/fr";

import { s3Storage } from "@payloadcms/storage-s3";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { globals, collections } from "@/src/features";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// payload requires a random secret.
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;

if (PAYLOAD_SECRET === undefined) {
  throw new Error("PAYLOAD_SECRET env var must be defined");
}

// requires a postgresql database uri - docker compose default is "postgresql://payload:payload@localhost:5432/payload_dev".
const DATABASE_URI = process.env.DATABASE_URI;

if (DATABASE_URI === undefined) {
  throw new Error("DATABASE_URI env var must be defined");
}

// get an email config if smtp server is defined - docker compose default is "localhost:1025".
function getEmailConfig() {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = Number(process.env.SMTP_PORT);
  const EMAIL_FROM = process.env.EMAIL_FROM || "dev@localhost";
  const EMAIL_NAME = process.env.EMAIL_NAME || "Dev Site";
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_AUTH =
    SMTP_USER !== undefined && SMTP_PASS !== undefined
      ? { user: SMTP_USER, pass: SMTP_PASS }
      : undefined;

  if (SMTP_HOST === undefined || isNaN(SMTP_PORT)) {
    return undefined;
  }

  return nodemailerAdapter({
    defaultFromAddress: EMAIL_FROM,
    defaultFromName: EMAIL_NAME,
    transportOptions: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: SMTP_AUTH,
    },
  });
}

// get a S3 storage plugin if a S3 bucket is defined - store files in ./upload otherwise.
function getS3Storage() {
  const S3_BUCKET = process.env.S3_BUCKET;
  const S3_REGION = process.env.S3_REGION;
  const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
  const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

  if (S3_BUCKET === undefined) {
    return undefined;
  }

  if (S3_ACCESS_KEY_ID === undefined) {
    return undefined;
  }

  if (S3_SECRET_ACCESS_KEY === undefined) {
    return undefined;
  }

  return s3Storage({
    collections: {
      media: true,
    },
    bucket: S3_BUCKET,
    config: {
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
      region: S3_REGION,
    },
  });
}

// get a plugin list with undefined ones filtered out.
const plugins = [getS3Storage()].filter((p) => p !== undefined);

// payload config
export default buildConfig({
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URI,
    },
    push: false,
    migrationDir: "./migrations",
  }),
  email: getEmailConfig(),
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { en, fr },
    fallbackLanguage: "fr",
  },
  editor: lexicalEditor(),
  globals,
  collections,
  sharp,
  plugins,
});
