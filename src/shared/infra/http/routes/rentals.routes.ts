import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListUserRentalsController } from "@modules/rentals/useCases/listUserRentals/ListUserRentalsController";
import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listUserRentalsController = new ListUserRentalsController();

rentalsRoutes.post("/", ensureAuthenticate, createRentalController.handle);
rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);

rentalsRoutes.get(
  "/user",
  ensureAuthenticate,
  listUserRentalsController.handle
);

export { rentalsRoutes };
