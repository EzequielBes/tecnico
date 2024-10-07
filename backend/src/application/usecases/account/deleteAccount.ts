import { inject } from "../../../di/registry";
import { AccountRepository } from "../../../infra/repository/databaseRepository";
import { AppError } from "../../../utils/errormap";

export class DeleteAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository

  constructor () {}
  async execute(input: accountDTO) {
    try {
    if(!input.account_id) throw new AppError("Id is required", 400);
    await this.accountRepository.deleteAccountByID(input.account_id)
    return "Account deleted"
  } catch (error:any) {
      if(error.statusCode) throw new AppError(error.message, error.statusCode)
      if(!error.statusCode)  throw new AppError(error.message, 402)
  }
  }
}

type accountDTO = {
  account_id :string
}
