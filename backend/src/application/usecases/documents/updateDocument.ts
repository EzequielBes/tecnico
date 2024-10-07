import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { InputDocument } from "../../../infra/interfaces/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { AppError } from "../../../utils/errormap";

export class UpdateDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : document) {
    try {

      if (!input.document_id) throw new AppError("Invalid format", 400);
      const document = await this.documentRepository.getDocumentById(input.document_id)
      if (!document) throw new AppError("Document not finded", 404);
      const updatedDocument = document.update(input.document_name, input.status)
      await this.documentRepository.updateDocument(updatedDocument)
      return "Document Updatted"
    }catch (error:any) {
        if(error.statusCode) throw new AppError(error.message, error.statusCode)
        if(!error.statusCode)  throw new AppError(error.message, 402)
    }
  }
}

type document = {
  document_id: string,
  status : string,
  document_name : string
  userId : string
}
