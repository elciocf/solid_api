// eslint-disable-next-line max-len
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
// eslint-disable-next-line max-len
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

/* specificationsRoutes.use(ensureAuthenticate); */
specificationsRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
