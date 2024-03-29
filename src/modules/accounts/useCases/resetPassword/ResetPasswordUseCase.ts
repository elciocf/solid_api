import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.usersTokensRepository.findByUserByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      dateNow
    );

    if (compare) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
