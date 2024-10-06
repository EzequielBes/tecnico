import { inject } from "../../../di/registry";
import { AccountRepository } from "../../../infra/repository/databaseRepository";

export class DeleteAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository

  constructor () {}
  async execute(input: accountDTO) {
    if(!input.account_id) throw new Error("Id is required");
    await this.accountRepository.deleteAccountByID(input.account_id)
    return "Account deleted"
  }
}

type accountDTO = {
  account_id :string
}
