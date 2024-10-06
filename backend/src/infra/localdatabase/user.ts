import { Account } from "../../domain/entity/Account";
import { AccountRepository } from "../repository/databaseRepository";

export class AccountRepositoryLocal implements AccountRepository {
  private accounts: Account[] = [];

  async saveAccount(account: Account): Promise<void> {
    this.accounts.push(account);
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find(acc => acc.email.getValue() === email);
    return account ? Account.restore(account.account_id, account.email.getValue(), account.name) : null;
  }

  async deleteAccountByID(id: string): Promise<void> {
    this.accounts = this.accounts.filter(acc => acc.account_id !== id);
  }

  async updateAccount(account: Account): Promise<void> {
    const index = this.accounts.findIndex(acc => acc.account_id === account.account_id);
    if (index !== -1) {
      this.accounts[index] = account; // Substitui a conta existente pela nova
    }
  }
}
