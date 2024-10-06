import express, { Request, Response, Application } from "express";
import cors from "cors";

export interface HttpServer {
  register(method: "get" | "post" | "put" | "delete", url: string, callback: (body: any, query: any) => Promise<any>): void;
  listen(port: number): void;
}

export class ExpressHttpServer implements HttpServer {
  app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: "get" | "post" | "put" | "delete", url: string, callback: (body: any, query: any) => Promise<any>): void {
    this.app[method](url, async (request: Request, response: Response) => {
      try {
        const output = await callback(request.body, request.query);
        response.status(200).json({ output });
      } catch (error: any) {
        response.status(500).json({ error: error.message });
      }
    });
  }

  listen(port: number): void {
    console.log(`Server listening on port ${port}`);
    this.app.listen(port);
  }
}
