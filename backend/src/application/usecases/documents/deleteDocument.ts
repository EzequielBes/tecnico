import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { InputDocument } from "../../../infra/interfaces/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { validateToken } from "../authentication/jwtValidate";

export class DeleteDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(params:{token:string, document_id: string}) {
    if(!validateToken(params.token)) throw new Error("Invalid token")
    if (!params.document_id ) throw new Error("Invalid format");
    await this.documentRepository.deleteDocument(params.document_id)
    return "Document Deleted"
  }
}
