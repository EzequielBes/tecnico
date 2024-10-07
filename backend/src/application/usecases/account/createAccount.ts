import { inject } from "../../../di/registry";
import { Account } from "../../../domain/entity/Account";
import { AccountRepository } from "../../../infra/repository/databaseRepository";
import { AppError } from "../../../utils/errormap";

export class CreateAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository
  constructor () {}

  async execute(input: accountDTO):Promise<string | void> {
    try {
      if(!input.name || !input.email) throw new AppError("Name or Email not valids", 400);
      const accountExists = await this.accountRepository.getAccountByEmail(input.email);
      if (accountExists) throw new AppError("Account already exists", 409);
      const account = Account.create(input.email, input.name)
      await this.accountRepository.saveAccount(account);
      return "Account created"
    }
    catch(error:any) {
        if(error.statusCode) throw new AppError(error.message, error.statusCode)
        if(!error.statusCode)  throw new AppError(error.message, 402)
       
    }
  } 
}

type accountDTO = {
  name: string,
  email : string
}
