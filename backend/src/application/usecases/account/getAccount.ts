import { inject } from "../../../di/registry";
import { AccountRepository } from "../../../infra/repository/databaseRepository";
import { generateJsonWebToken } from "../authentication/jwtGenerate";

export class GetAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository

  constructor () {}
  async execute(input: accountDTO) {
    if(!input.email) throw new Error("Name or Email not valids");
    const account = await this.accountRepository.getAccountByEmail(input.email);
    if (!account) throw new Error("Account not exists");
    const output = {
      account_id : account.account_id,
      email : account.email.getValue(),
      name: account.name
    }
    return output
  }
}

type accountDTO = {
  name: string,
  email : string
}
