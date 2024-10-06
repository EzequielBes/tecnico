import { CreateAccountUseCase } from "../../application/usecases/account/createAccount";
import { DeleteAccountUseCase } from "../../application/usecases/account/deleteAccount";
import { GetAccountUseCase } from "../../application/usecases/account/getAccount";
import { UpdateAccountUseCase } from "../../application/usecases/account/updateAccount";
import { CreateDocument } from "../../application/usecases/documents/createDocument";
import { DeleteDocument } from "../../application/usecases/documents/deleteDocument";
import { GetAllDocuments } from "../../application/usecases/documents/getAllDocuments";
import { GetDocument } from "../../application/usecases/documents/getDocument";
import { UpdateDocument } from "../../application/usecases/documents/updateDocument";
import { HttpServer } from "../../infra/http";




export class DocumentController {

  constructor (readonly httpConnection: HttpServer, readonly createDocument:CreateDocument, readonly deleteDocument: DeleteDocument,
   readonly getDocument: GetDocument, readonly getAllDocument: GetAllDocuments, readonly updatedDocument: UpdateDocument) {

    httpConnection.register("post", "/createUser", async (body:any, params:any) => {
      return await createDocument.execute(body, params)
    })

    httpConnection.register("get", "/getDocument", async (body: any, params: any) => {
      return await getDocument.execute(params)
    })

    httpConnection.register("get", "/getAllDocuments", async (body: any, params: any) => {
      return await getAllDocument.execute(params)
    })

    httpConnection.register("delete", "/deleteDocument", async (body: any, params:any) => {
      return await deleteDocument.execute(params);

    })

    httpConnection.register("put", "/updateDocument", async (body: any, params:any) => {
      return await updatedDocument.execute(body);
    })


  }
}
