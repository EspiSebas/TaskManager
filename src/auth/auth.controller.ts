import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { Auth } from './decorator/auth.decorator';
import { Roles } from 'src/common/roles';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly  authService: AuthService
    
    ) {}

    @Post("register")
    register(@Body() registerUserDto: RegisterUserDto){
        return  this.authService.register(registerUserDto);
    }

    @Post("login")
    login(@Body() loginUserDto:LoginUserDto){
        return this.authService.login(loginUserDto);
    }

    
    @Get('profile')
    @Auth(Roles.DEVELOPER)
    profile(@ActiveUser() user){
        return this.authService.getProfile(user);
    }
}
