import { Request, Response, NextFunction } from 'express';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
  const { UserId, Conversation } = req.body;
  
  if (!UserId) {
    return res.status(400).json({ error: "UserId is required" });
  }
  
  if (Conversation && !Conversation.conversation_id) {
    return res.status(400).json({ error: "Conversation ID is required" });
  }
  
  next();
};