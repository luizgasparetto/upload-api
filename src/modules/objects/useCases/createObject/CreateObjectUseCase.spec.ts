import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { ObjectsRepositoryInMemory } from "../../repositories/in-memory/ObjectsRepositoryInMemory";
import { CreateObjectUseCase } from "./CreateObjectUseCase";


let objectsRepositoryInMemory: ObjectsRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createObjectUseCase: CreateObjectUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Create object", () => {
  beforeEach(() => {
    objectsRepositoryInMemory = new ObjectsRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    createObjectUseCase = new CreateObjectUseCase(objectsRepositoryInMemory, userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to create an object", async () => {
    const user: ICreateUserDTO = {
      email: "test@email.com",
      password: "123456"
    };

    await createUserUseCase.execute(user);
    const userCreated = await userRepositoryInMemory.findByEmail(user.email);

    const object: ICreateObjectDTO = {
      width: 100,
      height: 100,
      user_id: userCreated.id,
    }

    await createObjectUseCase.execute(object);

    const objectsList = await objectsRepositoryInMemory.getObjects();

    expect(objectsList.length).toBe(1);
  });

  it("should not be able to create an object with non-exist user id", () => {
    expect(async () => {
      const object: ICreateObjectDTO = {
        width: 100,
        height: 100,
        user_id: "non-existing-id",
      };

      await createObjectUseCase.execute(object);
    }).rejects.toBeInstanceOf(AppError)
  });
});