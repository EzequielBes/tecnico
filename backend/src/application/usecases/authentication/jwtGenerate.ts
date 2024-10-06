import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY; 
if (!secretKey) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

export const generateJsonWebToken = async (account_id: string, name: string, email: string): Promise<string> => {
  const accountData = {
    account_id,
    name,
    email
  };
  
  const token = jwt.sign(accountData, secretKey, { expiresIn: '12h' }); 
  return token;
}
