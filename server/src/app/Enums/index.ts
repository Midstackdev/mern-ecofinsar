export enum ENVIRONMENT {
  "DEV" = "DEV",
  "STAGING" = "STAGING",
  "PROD" = "PROD",
}
export const ENVIRONMENT_VALUES = Object.values(ENVIRONMENT);

export enum DELIVERY_MODE {
  "SMS" = "SMS",
  "EMAIL" = "STAGING",
}

export const DELIVERY_MODE_VALUES = Object.values(DELIVERY_MODE);

export enum TWO_FACTOR_TYPE {
  "APP" = "APP",
  "TXT" = "TXT",
}
export const TWO_FACTOR_TYPE_VALUES = Object.values(TWO_FACTOR_TYPE);

export enum ROLES {
  ADMIN = "superadmin",
  MANAGER = "admin",
  EMPLOYEE = "EMPLOYEE",
  USER = "user",
  GUEST = "ANONYMOUS",
  MODERATOR = "MODERATOR",
}
export const ROLES_VALUES = Object.values(ROLES);
