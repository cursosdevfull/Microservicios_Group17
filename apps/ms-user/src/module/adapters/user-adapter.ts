import { DatabaseBootstrap } from "../../core/bootstrap";
import { UserPort } from "../ports";
import { User, UserData } from "../application";
import { UserDto } from "./dtos/user.dto";
import { CypherService } from "../../core/services";

export class UserAdapter implements UserPort {
    async save(user: User): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserData);
            const entity = UserDto.fromDomainToData(user) as UserData;
            await repository.save(entity)

            return user
        } catch (error) {
            console.error("Error saving user:", error);
            throw new Error(`Failed to save user: ${error}`);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserData);
            const entity = await repository.findOne({ where: { email } })

            return entity ? UserDto.fromDataToDomain(entity) as User : null
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error(`Failed to find user by email: ${error}`);
        }
    }

    async findByRefreshToken(refreshToken: string): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserData);
            const entity = await repository.findOne({ where: { refreshToken } })

            return entity ? UserDto.fromDataToDomain(entity) as User : null
        } catch (error) {
            console.error("Error finding user by refresh token:", error);
            throw new Error(`Failed to find user by refresh token: ${error}`);
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(UserData);
            const entity = await repository.findOne({ where: { email } })

            if (entity) {
                const isPasswordValid = await CypherService.compare(password, entity.password);
                if (isPasswordValid) {
                    return UserDto.fromDataToDomain(entity) as User;
                }
            }

            return null
        } catch (error) {
            console.error("Error logging in user:", error);
            throw new Error(`Failed to log in user: ${error}`);
        }
    }

}