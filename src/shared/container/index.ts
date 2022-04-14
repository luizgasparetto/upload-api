import { container } from "tsyringe";
import { IObjectRepository } from "../../modules/objects/domain/repositories/IObjectsRepository";
import { ObjectsRepository } from "../../modules/objects/infra/repositories/ObjectsRepository";
import { IUserRepository } from "../../modules/users/domain/repositories/IUserRepository";
import { UserRepository } from "../../modules/users/infra/repositories/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IObjectRepository>("ObjectsRepository", ObjectsRepository);