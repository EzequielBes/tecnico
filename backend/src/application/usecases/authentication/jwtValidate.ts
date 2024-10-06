import jwt from "jsonwebtoken"


export function validateToken(token: string) {
  try {
    const secretKey = process.env.SECRETKEY
    const decoded = jwt.verify(token, secretKey!);
    console.log('Token válido:', decoded);
    return decoded;
  } catch (error:any) {
    console.error('Token inválido:', error.message);
    return null;
  }
}
