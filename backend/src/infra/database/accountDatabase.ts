import { Account } from "../../domain/entity/Account";
import prisma from "./client";

export interface UserDatabase {
  saveAccount(account_id: string, email: string, name: string): Promise<void>;
  getAccount(email: string): Promise<any | null>;
  deleteAccount(account_id: string): Promise<void>;
  updateAccount(account_id: string, email: string, name: string): Promise<void>;
}
export class UserPrismaDatabase implements UserDatabase {
  constructor() {}
  async saveAccount(account_id: string, email: string, name: string) {
    await prisma.user.create({
      data: {
        account_id: account_id,
        email,
        name,
      },
    });
  }
  async getAccount(email: string) : Promise<any | null> {
    const account = await prisma.user.findUnique({ where: { email } });
    if(!account) return null
    return account;
  }

  async deleteAccount(account_id: string) {
    try {
    await prisma.user.delete({
      where: {
        account_id,
      },
    });
    } catch (err) {
      throw new Error("User don`t removed")
    }
  }

  async updateAccount(account_id: string, email: string, name: string) {
    const account = await prisma.user.update({
      where: {
        account_id,
      },
      data: {
        email,
        name,
      },
    });
  }
}
