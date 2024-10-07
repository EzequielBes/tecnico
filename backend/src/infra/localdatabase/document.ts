import { Document } from "../../domain/entity/Document";
import { DocumentRepository } from "../repository/documentDatabase";

export class DocumentLocalRepository implements DocumentRepository {
  private documents: Document[] = [];

  async saveDocument(document: Document): Promise<void> {
    this.documents.push(document);
  }

  async getDocumentById(document_id: string): Promise<Document | null> {
    const document = this.documents.find(doc => doc.document_id === document_id);
    return document ? Document.restore(document.document_id, document.document_name, document.status, document.user_id) : null;
  }

  async getDocumentByUser(userId: string): Promise<Document[]> {
    const userDocuments = this.documents.filter(doc => doc.user_id === userId);
    return userDocuments.map(document => 
      Document.restore(document.document_id, document.document_name, document.status, document.user_id)
    );
  }
  async deleteDocument(document_id: string): Promise<void> {
    const index = this.documents.findIndex(doc => doc.document_id === document_id);
    if (index !== -1) {
      this.documents.splice(index, 1); 
    } else {
      throw new Error(`Document with ID ${document_id} not found.`);
    }
  }

  async updateDocument(updatedDocument: Document): Promise<void> {
    const index = this.documents.findIndex(doc => doc.document_id === updatedDocument.document_id);
    if (index !== -1) {
      this.documents[index] = updatedDocument;
    } else {
      throw new Error(`Document with ID ${updatedDocument.document_id} not found.`);
    }
  }
}
