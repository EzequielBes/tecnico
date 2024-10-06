import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { InputDocument } from "../../../infra/interfaces/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";

export class GetAllDocuments {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input: {userId: string}) {
    if (!input.userId) throw new Error("Invalid format");
    const getDocuments = await this.documentRepository.getDocumentByUser(input.userId)
    return getDocuments
  }
}
