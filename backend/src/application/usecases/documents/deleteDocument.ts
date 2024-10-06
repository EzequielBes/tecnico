import { inject } from "../../../di/registry";

import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { validateToken } from "../authentication/jwtValidate";

export class DeleteDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(params:{document_id: string}, authHeader:string) {
  const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Token missing");
    if(!validateToken(token)) throw new Error("Invalid token")
    if (!params.document_id ) throw new Error("Invalid format");
    await this.documentRepository.deleteDocument(params.document_id)
    return "Document Deleted"
  }
}
