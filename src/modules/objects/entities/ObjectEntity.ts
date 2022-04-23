import { v4 as uuidV4 } from "uuid";

class ObjectEntity {
  id?: string;
  width: number;
  height: number;
  image_url?: string;
  user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ObjectEntity }