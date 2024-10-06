import { inject } from "../../../di/registry";

import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";

export class GetDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : {document_id: string}) {
    if (!input.document_id) throw new Error("Invalid format");
    const document = await this.documentRepository.getDocumentById(input.document_id)
    return document
  }
}
