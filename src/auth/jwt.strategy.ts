import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // let passport handle expiration
      secretOrKey: jwtConstants.secret,
    });
  }

  // Validate method returns an object that will be store in req.user
  // Passport automatically extract token and decodes the JSON
  async validate(payload: any) {
    // Could enrich here user with database informations
    return { userId: payload.sub, username: payload.username };
  }
}
