export const jwt_constants = {
  access_secret: process.env.JWT_SECRET_ACCESS,
  refresh_secret: process.env.JWT_SECRET_REFRESH,
  access_ttl: process.env.ACCESS_TTL,
  refresh_ttl: process.env.REFRESH_TTL,
};
