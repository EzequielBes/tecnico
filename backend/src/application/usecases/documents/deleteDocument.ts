import { inject } from "../../../di/registry";

import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { AppError } from "../../../utils/errormap";
import { validateToken } from "../authentication/jwtValidate";

export class DeleteDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(params:{document_id: string}, authHeader:string) {
    try {

      const token = authHeader.split(" ")[1];
      if (!token) throw new Error("Token missing");
      if(!validateToken(token)) throw new AppError("Invalid token", 401)
        if (!params.document_id ) throw new AppError("Invalid format", 400);
      await this.documentRepository.deleteDocument(params.document_id)
      return "Document Deleted"
    } catch (error:any) {
        if(error.statusCode) throw new AppError(error.message, error.statusCode)
        if(!error.statusCode)  throw new AppError(error.message, 402)
    }
  }
}
