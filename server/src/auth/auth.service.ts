import { payload } from './jwt.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtservice: JwtService,
  ) {}
  async signup(userCred: UserDto): Promise<void> {
    return this.userRepo.signup(userCred);
  }
  async signin(userCred: UserDto): Promise<{ accessToken: string }> {
    const username = await this.userRepo.validateUserPassword(userCred);
    if (!username) {
      throw new UnauthorizedException('invalid creditials');
    }
    const payload: payload = { username };
    const accessToken = await this.jwtservice.sign(payload);
    return { accessToken };
  }
}
