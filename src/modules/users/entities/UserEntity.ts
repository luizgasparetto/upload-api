import { v4 as uuidV4 } from "uuid";
import { ObjectEntity } from "../../objects/entities/ObjectEntity";

class UserEntity {
  id?: string;
  email: string;
  password: string;
  objects?: ObjectEntity[];
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserEntity };