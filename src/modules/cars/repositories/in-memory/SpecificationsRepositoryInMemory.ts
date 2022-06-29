import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.specifications.filter(
      (specification) => ids.includes(specification.id)
    );
    return allSpecifications;
  }
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }

  async list(): Promise<Specification[]> {
    const list = this.specifications;
    return list;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
