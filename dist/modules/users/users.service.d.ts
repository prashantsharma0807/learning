import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDataQueryParam } from './user.interface';
import { DbService } from 'src/utils/db.service';
import { FileService } from '../file/file.service';
import { RecordGrpcService } from 'src/grpc/record.grpc.servie';
export declare class UsersService {
    private userRepository;
    private readonly fileService;
    private readonly recordGrpcService;
    private dbService;
    constructor(userRepository: Repository<Users>, fileService: FileService, recordGrpcService: RecordGrpcService, dbService: DbService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<any>;
    findByUsername(email: string): Promise<any>;
    findAll(params: UserDataQueryParam): Promise<any>;
    getAcademicRecordById(id: number): Promise<import("src/grpc/record.grpc.servie").GetRecordResponse>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
