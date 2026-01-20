import { User, UserData } from "../../../module/application";

export class UserDto {
    static fromDomainToData(domain: User | User[]): UserData | UserData[] {
        if (Array.isArray(domain)) {
            if (domain.length === 0) return [];
            return [this.fromDomainToData(domain[0]) as UserData, ...this.fromDomainToData(domain.slice(1)) as UserData[]];
        }

        const props = domain.properties();
        const userData = new UserData();
        userData.id = props.id!;
        userData.name = props.name;
        userData.email = props.email;
        userData.password = props.password;
        userData.refreshToken = props.refreshToken;
        userData.createdAt = props.createdAt;
        return userData;
    }

    static fromDataToDomain(data: UserData | UserData[]): User | User[] {
        if (Array.isArray(data)) {
            if (data.length === 0) return [];
            return [this.fromDataToDomain(data[0]) as User, ...this.fromDataToDomain(data.slice(1)) as User[]];
        }

        return new User({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            refreshToken: data.refreshToken,
            createdAt: data.createdAt
        });
    }
}