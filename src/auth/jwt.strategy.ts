import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service.js';
import { RolesService } from '../users/roles.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // let passport handle expiration
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // Validate method returns an object that will be store in req.user
  // Passport automatically extract token and decodes the JSON
  async validate(payload: any) {
    const roles = await this.rolesService.getUserRoles(payload.sub);

    // Could enrich here user with database informations
    return {
      id: payload.sub,
      email: payload.username,
      roles: roles.map((role) => role.name),
    };
  }
}
