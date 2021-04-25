// Enables typing custom commands added to Cypress
declare namespace Cypress {
  interface Chainable {
    /**
     * Creates a user with random credentials in the database.
     */
    createUser(): Chainable<ProjectTypes.UserInfo>;
  }
}

// These are **copies** of the types from the main project, located in src/types.d.ts.
// A better way of maintaining consistent types between `cypress` and `src` may exist.
declare namespace ProjectTypes {
  export interface UserInfo {
    id: number;
    username: string;
    password: string;
  }
}
