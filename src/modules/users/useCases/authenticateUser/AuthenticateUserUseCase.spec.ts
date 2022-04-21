import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase, IResponse } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "test@email.com",
      password: "123456"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
  });

  it("should not be able to authenticate a nonexisting user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: "nonexisting@email.com", password: "nonexisting" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        email: "test@email.com",
        password: "123456"
      }

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({ email: user.email, password: "incorrect-password" });
    }).rejects.toBeInstanceOf(AppError);
  });
});