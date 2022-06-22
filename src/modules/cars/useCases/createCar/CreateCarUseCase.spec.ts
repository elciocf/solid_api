import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;

let createCarUseCase: CreateCarUseCase;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 15,
            brand: "Brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with license plate that already exists", async () => {
        expect(async () => {
            const car = {
                name: "Name Car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 15,
                brand: "Brand",
                category_id: "category",
            };

            await createCarUseCase.execute({
                name: car.name,
                description: car.description,
                daily_rate: car.daily_rate,
                license_plate: car.license_plate,
                fine_amount: car.fine_amount,
                brand: car.brand,
                category_id: car.category_id,
            });

            await createCarUseCase.execute({
                name: car.name,
                description: car.description,
                daily_rate: car.daily_rate,
                license_plate: car.license_plate,
                fine_amount: car.fine_amount,
                brand: car.brand,
                category_id: car.category_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("A new car needs to be available", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "DEF-1234",
            fine_amount: 15,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
