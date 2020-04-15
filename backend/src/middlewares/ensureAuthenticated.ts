import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'; // verifica se o token é válido

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  // ',' no array, pq indico que na desestruturação não vou usar a primeira
  // posição (no caso 'Bearer')

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; // decoded não sabe de q tipo é
    // então o as força que o decoded é do tiop TokenPayload

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
