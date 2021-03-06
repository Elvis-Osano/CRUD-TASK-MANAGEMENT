import { User } from './user.entity';
import { payload } from './jwt.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as config from 'config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }
  async validate(payload: payload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
