import { inject } from "../../di/registry";
import { Account } from "../../domain/entity/Account";
import { UserDatabase } from "../database/accountDatabase";


export interface AccountRepository {
  saveAccount (account: Account): Promise<void>;
  getAccountByEmail (email: string):Promise<Account | null>
  deleteAccountByID(id: string):Promise<void>;
  updateAccount(account : Account): Promise<void>
}


export class AccountRepositoryDatabase implements AccountRepository {
  @inject("accountDatabase")
  readonly userDatabase!: UserDatabase
  constructor () {}
  async saveAccount(account: Account): Promise<void> {
    await this.userDatabase.saveAccount(account.account_id, account.email.getValue(),account.name)
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.userDatabase.getAccount(email)
    if(!account) return null
    return Account.restore(account.account_id, account.email,account.name)
  }
  async deleteAccountByID(id: string): Promise<void> {
    await this.userDatabase.deleteAccount(id)
  }
  async updateAccount(account: Account): Promise<void> {
    await this.userDatabase.updateAccount(account.account_id, account.email.getValue(), account.name)
  }

}
