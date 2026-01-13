export type UserEssential = {
    name: string;
    email: string;
    password: string;
}

export type UserOptionals = {
    id: number;
    createdAt: Date;
    refreshToken: string;
}

export type UserProps = UserEssential & Partial<UserOptionals>;

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private refreshToken!: string;
    private createdAt: Date;

    constructor(props: UserProps) {
        if (props.id && props.id < 1) throw new Error("Invalid id");
        if (props.name && props.name.length === 0) throw new Error("Invalid name");
        if (props.email && props.email.length === 0) throw new Error("Invalid email");
        if (props.password && props.password.length === 0) throw new Error("Invalid password");
        if (props.createdAt && !(props.createdAt instanceof Date)) throw new Error("Invalid createdAt");

        this.name = props.name;
        this.email = props.email;
        this.password = props.password;

        if (!props.refreshToken) {
            this.refreshToken = crypto.randomUUID();
        }

        this.createdAt = props.createdAt ? props.createdAt : new Date();

        if (props.id) {
            this.id = props.id;
        }
    }

    properties() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            refreshToken: this.refreshToken,
            createdAt: this.createdAt,
        }
    }
}