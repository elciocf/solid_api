import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListUserRentalsUseCase } from "./ListUserRentalsUseCase";

class ListUserRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);

    const list = await listUserRentalsUseCase.execute(id);
    return response.status(201).json(list);
  }
}

export { ListUserRentalsController };
