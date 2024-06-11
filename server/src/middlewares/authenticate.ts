import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const authenticate = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized!!!' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
      req.user = decoded;
      next();
    } catch (error) {
      console.log("error: ", error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };


export default authenticate;