import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { InputDocument } from "../../../infra/interfaces/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { validateToken } from "../authentication/jwtValidate";

export class CreateDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : document, params: {token: string}):Promise<string> {
    if(!validateToken(params.token)) throw new Error("Invalid token")
    if (!input.document_name || !input.status || !input.userId) throw new Error("Invalid format");
    const document = Document.create(input.document_name, input.status, input.userId);
    await this.documentRepository.saveDocument(document)
    return "Document Created"
  }
}


type document = {
  document_name: string,
  status : string,
  userId : string
}
