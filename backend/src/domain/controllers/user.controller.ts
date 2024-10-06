import { CreateAccountUseCase } from "../../application/usecases/account/createAccount";
import { DeleteAccountUseCase } from "../../application/usecases/account/deleteAccount";
import { GetAccountUseCase } from "../../application/usecases/account/getAccount";
import { UpdateAccountUseCase } from "../../application/usecases/account/updateAccount";
import { HttpServer } from "../../infra/http";

export class UserController {

  constructor (readonly httpConnection: HttpServer, readonly createAccount : CreateAccountUseCase,
    readonly deleteAccount : DeleteAccountUseCase, readonly getAccount: GetAccountUseCase, readonly updatedAccount: UpdateAccountUseCase) {

    httpConnection.register("post", "/createUser", async (body:any, params:any) => {
      return await createAccount.execute(body)
    })

    httpConnection.register("get", "/getAccount", async (body: any, params: any) => {
      return await getAccount.execute(params)
    })

    httpConnection.register("delete", "/deleteAccount", async (body: any, params:any) => {
      return await deleteAccount.execute(params);

    })

    httpConnection.register("put", "/updateAccount", async (body: any, params:any) => {
      return await deleteAccount.execute(body);

    })


  }
}
