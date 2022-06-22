import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationsDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
    create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO };
