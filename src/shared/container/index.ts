import { container } from "tsyringe";
import { IObjectRepository } from "../../modules/objects/repositories/IObjectsRepository";
import { ObjectsRepository } from "../../modules/objects/repositories/implementations/ObjectsRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { UserRepository } from "../../modules/users/repositories/implementations/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IObjectRepository>("ObjectsRepository", ObjectsRepository);