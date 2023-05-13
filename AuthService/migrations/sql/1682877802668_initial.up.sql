CREATE TABLE "User" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "email" character varying NOT NULL,
  "firstName" character varying NOT NULL,
  "lastName" character varying NOT NULL,
  "password" character varying NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"),
  CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")
);
