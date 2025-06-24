export {};

// Create a type for the roles
export type Roles = "admin" | "operator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
