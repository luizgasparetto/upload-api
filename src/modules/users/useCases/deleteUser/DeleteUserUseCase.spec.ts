import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase

describe("Delete user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
  });

  it("should be able to delete an user", async () => {
    const user: ICreateUserDTO = {
      email: "test@email.com",
      password: "123456"
    }

    await createUserUseCase.execute(user);

    const userFound = await userRepositoryInMemory.findByEmail(user.email);

    await deleteUserUseCase.execute({ id: userFound.id });

    expect(userRepositoryInMemory.users.length === 0).toBeTruthy();
  });

  it("should not be able to delete a non existing user", () => {
    expect(async () => {
      await deleteUserUseCase.execute({ id: "non-existing-id" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
