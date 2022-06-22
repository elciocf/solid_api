import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 15,
            brand: "Brand",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Test",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 15,
            brand: "Brand",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({ name: car.name });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Brand",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 15,
            brand: "Brand Test",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: car.brand,
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Category",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 15,
            brand: "Brand Test",
            category_id: "category_test",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: car.category_id,
        });

        expect(cars).toEqual([car]);
    });
});
