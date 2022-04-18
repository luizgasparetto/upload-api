import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { ObjectsRepositoryInMemory } from "../../repositories/in-memory/ObjectsRepositoryInMemory";
import { CreateObjectUseCase } from "../createObject/CreateObjectUseCase";
import { UpdateObjectImageUseCase } from "./UpdateObjectImageUseCase";

let objectsRepositoryInMemory: ObjectsRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createObjectUseCase: CreateObjectUseCase;
let updateObjectImageUseCase: UpdateObjectImageUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Update object image", () => {
  beforeEach(() => {
    objectsRepositoryInMemory = new ObjectsRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    createObjectUseCase = new CreateObjectUseCase(objectsRepositoryInMemory, userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    updateObjectImageUseCase = new UpdateObjectImageUseCase(objectsRepositoryInMemory);
  });

  it("should be able to update an object's image", async () => {
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

    await updateObjectImageUseCase.execute({ object_id: objectsFound[0].id, url: "object-url", filename: "object-name" })

    const objectWithImage = await objectsRepositoryInMemory.getObjects();

    expect(objectWithImage[0].image_url).not.toBeNull();
  });

  it("should not be able to update a non existing object", () => {
    expect(async () => {
      await updateObjectImageUseCase.execute({
        object_id: "non-existing-id",
        url: "object-url",
        filename: "object-name"
      })
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should use localhost url when url was not provided", async () => {
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

    await updateObjectImageUseCase.execute({ object_id: objectsFound[0].id, url: null, filename: "object-name" });

    const objectsFoundWithUrl = await objectsRepositoryInMemory.getObjects();

    expect(objectsFoundWithUrl[0].image_url).toContain("localhost");
  });
});