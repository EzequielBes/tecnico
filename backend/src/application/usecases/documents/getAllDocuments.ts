import { inject } from "../../../di/registry";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { AppError } from "../../../utils/errormap";

export class GetAllDocuments {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input: {userId: string}) {
    try {

      if (!input.userId) throw new AppError("Invalid format", 400);
      const getDocuments = await this.documentRepository.getDocumentByUser(input.userId)
      return getDocuments
    }catch (error:any) {
        if(error.statusCode) throw new AppError(error.message, error.statusCode)
        if(!error.statusCode)  throw new AppError(error.message, 402)
    }
    }
}
