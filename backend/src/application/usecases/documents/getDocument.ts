import { inject } from "../../../di/registry";

import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { AppError } from "../../../utils/errormap";

export class GetDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : {document_id: string}) {
    try {

      if (!input.document_id) throw new AppError("Invalid format",400 );
      const document = await this.documentRepository.getDocumentById(input.document_id)
      return document
    }catch (error:any) {
        if(error.statusCode) throw new AppError(error.message, error.statusCode)
        if(!error.statusCode)  throw new AppError(error.message, 402)
    }
  }
}
