import { inject } from "../../../di/registry";
import { Account } from "../../../domain/entity/Account";
import { AccountRepository } from "../../../infra/repository/databaseRepository";

export class CreateAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository
  constructor () {}

  async execute(input: accountDTO):Promise<string> {
    if(!input.name || !input.email) throw new Error("Name or Email not valids");
    
    const accountExists = await this.accountRepository.getAccountByEmail(input.email);
    if (accountExists) throw new Error("Account already exists");
    console.log(accountExists)
    const account = Account.create(input.email, input.name)
    await this.accountRepository.saveAccount(account);
    return "Account created"
  }
}

type accountDTO = {
  name: string,
  email : string
}
