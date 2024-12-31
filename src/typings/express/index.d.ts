import { User } from "../../models/UserModel";

declare global {
  namespace Express {
    interface User extends User {}
  }
}

declare global {
    namespace Express {
      interface Request {
        user?: User;  // Add the user property with the type of User
      }
    }
  }