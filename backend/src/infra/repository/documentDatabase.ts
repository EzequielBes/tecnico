import { inject } from "../../di/registry";
import { Account } from "../../domain/entity/Account";
import { DocumentDatabase } from "../database/documentDatabase";
import {Document} from "../../domain/entity/Document"

export interface DocumentRepository {
  saveDocument(document: Document):Promise<void>
  getDocumentById(document_id:string): Promise<Document | null>
  getDocumentByUser(email: string):Promise<Document[] | null>
  deleteDocument(document_id:string):Promise<void>
  updateDocument(updatedDocument : Document):Promise<void>
}


export class DocumentDatabaseRepository implements DocumentRepository {
  @inject("documentDatabase")
  readonly documentDatabase!: DocumentDatabase

  constructor () {}

    async saveDocument(document: Document): Promise<void> {
      await this.documentDatabase.saveDocument(document.document_id, document.user_id,document.document_name, document.status)
    }

   async getDocumentById(document_id: string): Promise<Document | null> {
      const output = await this.documentDatabase.getDocumentById(document_id)
      if(!output) return null
      return Document.restore(output.document_id, output.document_name, output.status, output.user_id)
    }

   async getDocumentByUser(userId: string): Promise<Document[] | null> {
        const output = await this.documentDatabase.getDocumentByUser(userId)
        if(!output) return null;
        return output.map((document) => Document.restore(document.document_id, document.document_name,
          document.status, document.user_id))
    }

   async deleteDocument(document_id: string): Promise<void> {
        await this.documentDatabase.deleteDocument(document_id)
    }
   async updateDocument(updatedDocument : Document): Promise<void> {
        const output = await this.documentDatabase.updateDocument(updatedDocument.document_id,
          updatedDocument.document_name, updatedDocument.status)
    }




}
