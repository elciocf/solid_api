import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCarsCars/ListAvailableCarsController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsUseCase = new ListAvailableCarsController();

carsRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get(
    "/available",
    ensureAuthenticate,
    listAvailableCarsUseCase.handle
);

export { carsRoutes };
