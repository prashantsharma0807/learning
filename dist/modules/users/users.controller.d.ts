import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { Users } from './entities/user.entity';
import { UserDataQueryParam } from './user.interface';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(file: Express.Multer.File, createUserDto: CreateUserDto): Promise<any>;
    login(req: any): string;
    find(email: string, req: any): Promise<Users>;
    findAll(params: UserDataQueryParam): Promise<any>;
    getAcadmicRecord(id: number): Promise<import("../../grpc/record.grpc.servie").GetRecordResponse>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
