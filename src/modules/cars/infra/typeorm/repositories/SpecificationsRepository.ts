import {
    ICreateSpecificationsDTO,
    ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationsDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }
}

export { SpecificationsRepository };
