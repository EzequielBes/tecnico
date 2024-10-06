import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { InputDocument } from "../../../infra/interfaces/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";

export class UpdateDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : document) {
    if (!input.document_id) throw new Error("Invalid format");
    const document = await this.documentRepository.getDocumentById(input.document_id)
    if (!document) throw new Error("Document not finded");
    const updatedDocument = document.update(input.document_name, input.status)
    await this.documentRepository.updateDocument(updatedDocument)
    return "Document Updatted"
  }
}


type document = {
  document_id: string,
  status : string,
  document_name : string
  userId : string
}
