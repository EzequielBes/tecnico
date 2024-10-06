import prisma from "./client";
import { Document } from "../../domain/entity/Document";
export interface DocumentDatabase {
  saveDocument(document_id: string, user_id: string, document_name: string, status: string):Promise<void>
  getDocumentById(document_id:string): Promise<Document | null>
  getDocumentByUser(userId: string):Promise<Document[] | null>
  deleteDocument(document_id:string):Promise<void>
  updateDocument(document_id: string, document_name:string, status:string):Promise<void>

}

export class DocumentPrismaDatabase implements DocumentDatabase {

  constructor () {}


  async saveDocument(document_id: string, user_id: string, document_name: string, status: string) {
    await prisma.document.create({
      data : {
        document_id,
        status,
        document_name,
        user_id
      }
    })
  }

  async getDocumentById (document_id:string) :Promise<Document | null> {
    const document =  await prisma.document.findUnique({where:{document_id}})
    if(!document) return null
    return Document.restore(document.document_id, document.document_name, document.status, document.user_id)
  }

  async getDocumentByUser (user_id:string):Promise<Document[] | null>  {
    const output =  await prisma.document.findMany({where:{user_id}})
    if(!output) return null
    return output.map((document) => Document.restore(document.document_id, document.document_name,
      document.status, document.user_id))

  }

 async deleteDocument (document_id: string) {
    await prisma.document.delete({
      where: {
        document_id
      }
    })
  }

  async updateDocument(document_id: string, document_name:string, status:string) {
    const account = await prisma.document.update({
      where: {
        document_id
      },
      data: {
      document_name,
      status,

      }
    })
  }


}
