import { inject } from "../../../di/registry";
import { AccountRepository } from "../../../infra/repository/databaseRepository";
import { AppError } from "../../../utils/errormap";
import { generateJsonWebToken } from "../authentication/jwtGenerate";

export class GetAccountUseCase {
  @inject("accountRepository")
  readonly accountRepository! : AccountRepository

  constructor () {}
  async execute(input: accountDTO) {
    try {
    if(!input.email) throw new AppError("Name or Email not valids", 400);
    const account = await this.accountRepository.getAccountByEmail(input.email);
    if (!account) throw new AppError("Account not exists", 404);
    const jwtGenerate = await generateJsonWebToken(account.account_id, account.email.getValue(), account.name )
    const output = {
      account_id : account.account_id,
      email : account.email.getValue(),
      name: account.name,
      jwt: jwtGenerate
    }
    return output
  } catch(error:any) {
      if(error.statusCode) throw new AppError(error.message, error.statusCode)
      if(!error.statusCode)  throw new AppError(error.message, 402)
  }
  }
}

type accountDTO = {
  name: string,
  email : string
}
