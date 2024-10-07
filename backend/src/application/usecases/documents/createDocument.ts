import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { AppError } from "../../../utils/errormap";
import { validateToken } from "../authentication/jwtValidate";

export class CreateDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : document, authHeader: string):Promise<string | void> {
    try{

      const token = authHeader.split(" ")[1];
      if (!token) throw new AppError("Token missing", 401);
      if(!validateToken(token)) throw new Error("Invalid token")
        if (!input.document_name || !input.status || !input.account_id) throw new AppError("Invalid format",400);
      const document = Document.create(input.document_name, input.status, input.account_id);
      await this.documentRepository.saveDocument(document)
      return "Document Created"
    } catch (error:any) {
        if(error.statusCode) throw new AppError(error.message, error.statusCode)
        if(!error.statusCode)  throw new AppError(error.message, 402)
    }
  }
}


type document = {
  document_name: string,
  status : string,
  account_id : string
}
