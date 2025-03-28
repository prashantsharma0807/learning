import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailValidationPipe } from 'src/utils/emailValidation.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { RoleGuard } from 'src/utils/role.guard';
import { Users } from './entities/user.entity';
import { UserDataQueryParam } from './user.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
//@UseGuards(AuthGuard('jwt'))     ## Controller level guard
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService : AuthService
  ) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body(new EmailValidationPipe()) createUserDto: CreateUserDto):Promise<any> {
    try {
      console.log('...........')
      return this.usersService.create(createUserDto, file);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req:any){
    try{
      console.log(req.user)
     return this.authService.generateToken(req.user);
    }catch(error){
      console.log(error)
      throw error;
    }
  }

  @Get(':email')
 // @UseGuards(AuthGuard('jwt'), new RoleGuard('student'))
  @UseGuards(RoleGuard)
  find(@Param('email') email:string, @Request() req:any):Promise<Users> {
    console.log(req.user) 
    return this.usersService.findByUsername(email);
  }

  @Get()
  findAll(@Query() params: UserDataQueryParam){
    try{
        return this.usersService.findAll(params)
    }catch(error){
      console.log(error)
      throw error;
    }
  }


  @Get('record/:id')
  getAcadmicRecord(@Param('id') id: number ){
    try{
      return this.usersService.getAcademicRecordById(id);
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'runnnnnnnn'
   // return this.usersService.remove(+id);
  }
}
