import { v4 as uuidV4 } from "uuid";

class UserEntity {
  id?: string;
  email: string;
  password: string;
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserEntity };