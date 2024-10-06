
import { v4 as uuidv4, v4 } from 'uuid';
export class Document {

  private constructor (
    readonly document_id : string,
    readonly document_name: string,
    readonly status : string,
    readonly user_id : string
  ) {}

  static create ( document_name: string, status: string,  user_id: string ) {
    const uuid = uuidv4()
    return new Document(uuid, document_name, status,  user_id)
  }

  static restore (document_id:string, document_name: string, status: string,  user_id: string) {
    return new Document(document_id,document_name,status,  user_id)
  }
  update(document_name:string, status:string) {
    return new Document(this.document_id, document_name, status, this.user_id)
  }
}
