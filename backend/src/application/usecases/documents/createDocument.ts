import { inject } from "../../../di/registry";
import { Document } from "../../../domain/entity/Document";
import { DocumentDatabaseRepository } from "../../../infra/repository/documentDatabase";
import { validateToken } from "../authentication/jwtValidate";

export class CreateDocument {
  @inject("documentRepository")
  readonly documentRepository!: DocumentDatabaseRepository

  constructor() { }
  async execute(input : document, authHeader: string):Promise<string> {
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Token missing");
    if(!validateToken(token)) throw new Error("Invalid token")
    if (!input.document_name || !input.status || !input.account_id) throw new Error("Invalid format");
    const document = Document.create(input.document_name, input.status, input.account_id);
    await this.documentRepository.saveDocument(document)
    return "Document Created"
  }
}


type document = {
  document_name: string,
  status : string,
  account_id : string
}
