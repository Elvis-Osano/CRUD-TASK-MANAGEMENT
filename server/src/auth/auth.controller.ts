import { TasksService } from './../tasks/tasks.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) usercred: UserDto): Promise<void> {
    return this.AuthService.signup(usercred);
  }
  @Post('signin')
  signin(
    @Body(ValidationPipe) usercred: UserDto,
  ): Promise<{ accessToken: string }> {
    return this.AuthService.signin(usercred);
  }
}
