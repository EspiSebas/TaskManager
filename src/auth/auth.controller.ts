import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './roles.guard';

interface RequestWithUser extends Request {
    user : {
        email: string,
        role: string
    }
}

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
    @Roles('developer')
    @UseGuards(AuthGuard,RolesGuard)
    profile(@Req() req:RequestWithUser){
        return req.user;
    }
}
