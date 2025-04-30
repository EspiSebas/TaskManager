import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/common/roles';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService
    ){}

    async register({name,email,password}: RegisterUserDto) {
      const user = this.userService.findOneByEmail(email)
      if(!user){
        throw new BadRequestException('User already exists');
      }
      return await this.userService.create({
          name, 
          email, 
          password: await bcryptjs.hash(password,12),
          role:Roles.DEVELOPER
      });

    }


    async login(loginUserDto:LoginUserDto) {
        const user = await this.userService.findOneByEmailWithPassword(loginUserDto.email)
        if(!user){
            throw new UnauthorizedException('Email is wrong');
        }

        const password = await bcryptjs.compare(loginUserDto.password, user.password)
        if(!password){
            throw new UnauthorizedException('Password is wrong')
        }

        const payload = { email: user.email ,role: user.role, id:user.id}

        const token = await this.jwtService.signAsync(payload);
        return `Welcome : ${user.name} and your token is ${token}`;
    }


    async getProfile(user){
        return await this.userService.findOneByEmail(user.emai);
    }
}
