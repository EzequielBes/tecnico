import { inject } from "../../../di/registry";
import { AccountRepository } from "../../../infra/repository/databaseRepository";
import { AppError } from "../../../utils/errormap";

export class UpdateAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository

  constructor () {}

  async execute(input: accountUpdated):Promise<string | void> {
    try {
    if(!input.name || !input.email) throw new AppError("Name or Email not valid", 400);
    const account = await this.accountRepository.getAccountByEmail(input.email);
    if (!account) throw new AppError("Account not exists", 404);
    const updatedAccount = account.update(input.email, input.name)
    await this.accountRepository.updateAccount(updatedAccount);
    return "Account Updated"
  }catch (error:any) {
      if(error.statusCode) throw new AppError(error.message, error.statusCode)
      if(!error.statusCode)  throw new AppError(error.message, 402)
  }
  }
}

type accountUpdated = {
  id: string
  name: string,
  email : string
}
