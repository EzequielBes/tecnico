import { Email } from "../vo/email";
import { v4 as uuidv4, v4 } from 'uuid';
export class Account {

  private constructor (
    readonly account_id : string,
    readonly email : Email,
    readonly name : string
  ) {}

  static create (email: string, name: string) {
    const uuid = uuidv4()
    return new Account(uuid, new Email(email), name)
  }

  static restore (account_id : string, email : string, name: string) {
    return new Account(account_id, new Email(email), name)
  }

   update(email: string, name: string) {
    return new Account(this.account_id,new Email(email), name)
  }
}
