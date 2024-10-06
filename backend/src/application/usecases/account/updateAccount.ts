import { inject } from "../../../di/registry";
import { AccountRepository } from "../../../infra/repository/databaseRepository";

export class UpdateAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository

  constructor () {}

  async execute(input: accountUpdated):Promise<string> {
    if(!input.name || !input.email) throw new Error("Name or Email not valid");
    const account = await this.accountRepository.getAccountByEmail(input.email);
    if (!account) throw new Error("Account not exists");
    const updatedAccount = account.update(input.email, input.name)
    await this.accountRepository.updateAccount(updatedAccount);
    return "Account Updated"
  }
}

type accountUpdated = {
  id: string
  name: string,
  email : string
}
