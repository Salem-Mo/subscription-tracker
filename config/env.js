import {config} from 'dotenv';
config({path:`.env.${process.env.NODE_ENV || 'dev'}.local`});

export const {
    PORT,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRATION,
    ARCJET_ENV,
    ARCJET_KEY,
    QSTASH_URL,
    QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    SERVER_URL,
    SMTP_USER,
    SMTP_PASS,
    SMTP_HOST,
    SMTP_PORT
} = process.env;