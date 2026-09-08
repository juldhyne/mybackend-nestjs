import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Use LocalAuthGuard instead of AuthGuard('local') and avoid coding with "magic strings"
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
