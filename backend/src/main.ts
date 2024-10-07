import dotenv from 'dotenv';
import { ExpressHttpServer } from './infra/http';
import { UserController } from './domain/controllers/user.controller';
import { CreateAccountUseCase } from './application/usecases/account/createAccount';
import { AccountRepositoryDatabase } from './infra/repository/databaseRepository';
import { UserPrismaDatabase } from './infra/database/accountDatabase';
import { DocumentPrismaDatabase } from './infra/database/documentDatabase';
import { DocumentDatabaseRepository } from './infra/repository/documentDatabase';
import { Registry } from './di/registry';
import { DeleteAccountUseCase } from './application/usecases/account/deleteAccount';
import { GetAccountUseCase } from './application/usecases/account/getAccount';
import { UpdateAccountUseCase } from './application/usecases/account/updateAccount';
import { DocumentController } from './domain/controllers/document.controller';
import { CreateDocument } from './application/usecases/documents/createDocument';
import { GetAllDocuments } from './application/usecases/documents/getAllDocuments';
import { GetDocument } from './application/usecases/documents/getDocument';
import { DeleteDocument } from './application/usecases/documents/deleteDocument';
import { UpdateDocument } from './application/usecases/documents/updateDocument';
import { DocumentLocalRepository } from './infra/localdatabase/document';
import { AccountRepositoryLocal } from './infra/localdatabase/user';

dotenv.config()
const http  = new ExpressHttpServer()

// const accountRepository = new AccountRepositoryDatabase()   class repositorio de account
// const accountDatabase = new UserPrismaDatabase()             class database prisma de usuario
// const documentDatabase = new DocumentPrismaDatabase()        class database prisma de document
// const documentRepository = new DocumentDatabaseRepository()   class repositorio de document

const documentMemory = new DocumentLocalRepository()
const accountMemory = new AccountRepositoryLocal()

// Para usar banco de dados
//Registry.getInstance().provide("accountDatabase", accountDatabase)           <- Database Account
//Registry.getInstance().provide("documentDatabase", documentDatabase)         <- Database Document
//Registry.getInstance().provide("accountRepository", accountRepository)       <- Repositorio Account
//Registry.getInstance().provide("documentRepository", documentRepository)     <- Repositorio Document

// em memoria
Registry.getInstance().provide("accountRepository", accountMemory)
Registry.getInstance().provide("documentRepository", documentMemory)



const createAccount = new CreateAccountUseCase()
const deleteAccount = new DeleteAccountUseCase()
const getAccount = new GetAccountUseCase()
const updatedAccount = new UpdateAccountUseCase()
const userRoute = new UserController(http, createAccount, deleteAccount, getAccount, updatedAccount)

const createDocument = new CreateDocument()
const deleteDocument = new DeleteDocument()
const getDocument = new GetDocument()
const getAllDocuments = new GetAllDocuments()
const updatedDocument = new UpdateDocument()

const documentRoute = new DocumentController(http, createDocument, deleteDocument, getDocument, getAllDocuments, updatedDocument)

const port = process.env.PORT || "4000";

http.listen(port);
