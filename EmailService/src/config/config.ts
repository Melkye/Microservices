export const config = () => ({
  api: {
    origin: process.env.API_ORIGIN,
  },
  mailgun: {
    apiKey: {
      format: String,
      env: 'MAILGUN_API_KEY',
    },
    domain: {
      format: String,
      env: 'MAILGUN_DOMAIN',
    },
    emailFrom: {
      format: String,
      env: 'EMAIL_FROM',
    },
  },
  kafka: {
    clientId: {
      format: String,
      env: 'BOOKSHOP_EMAIL_SERVICE_HOST',
    },
  },
});
