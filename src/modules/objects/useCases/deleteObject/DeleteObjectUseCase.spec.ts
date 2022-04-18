import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { ObjectsRepositoryInMemory } from "../../repositories/in-memory/ObjectsRepositoryInMemory";
import { CreateObjectUseCase } from "../createObject/CreateObjectUseCase";
import { DeleteObjectUseCase } from "./DeleteObjectUseCase";

let objectsRepositoryInMemory: ObjectsRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createObjectUseCase: CreateObjectUseCase;
let deleteObjectUseCase: DeleteObjectUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Delete object", () => {
  beforeEach(() => {
    objectsRepositoryInMemory = new ObjectsRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    createObjectUseCase = new CreateObjectUseCase(objectsRepositoryInMemory, userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    deleteObjectUseCase = new DeleteObjectUseCase(objectsRepositoryInMemory);
  });

  it("should be able to delete an object", async () => {
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
    };

    await createObjectUseCase.execute(object);

    const objectsFound = await objectsRepositoryInMemory.getObjects();

    await deleteObjectUseCase.execute({ object_id: objectsFound[0].id });

    expect(objectsRepositoryInMemory.objects.length).toBe(0);
  });

  it("should not be able to delete a non-exist object", () => {
    expect(async () => {
      await deleteObjectUseCase.execute({ object_id: "non-existing-id" });
    }).rejects.toBeInstanceOf(AppError);
  });
});