import express, { Request, Response, Application } from "express";
import cors from "cors";

export interface HttpServer {
  register(method: "get" | "post" | "put" | "delete", url: string, callback: (body: any, query: any, headers:any) => Promise<any>): void;
  listen(port: string | undefined): void;
}

export class ExpressHttpServer implements HttpServer {
  app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: "get" | "post" | "put" | "delete", url: string, callback: (body: any, query: any, headers:any) => Promise<any>): void {
    this.app[method](url, async (request: Request, response: Response) => {
      try {
        const output = await callback(request.body, request.query, request.headers);
        response.status(200).json( output );
      } catch (error: any) {
        response.status(500).json({ error: error.message });
      }
    });
  }

  listen(port: string | undefined): void {
    console.log(`Server listening on port ${port}`);
    this.app.listen(port);
  }
}
