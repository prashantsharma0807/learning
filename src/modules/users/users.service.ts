import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../utils/apiResponse.service'
import { UserDataQueryParam } from './user.interface';
import { DbService } from 'src/utils/db.service';
import { FileService } from '../file/file.service';
import { RecordGrpcService } from 'src/grpc/record.grpc.servie';
import { error } from 'console';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    private readonly fileService: FileService,
    private readonly recordGrpcService: RecordGrpcService,
    private dbService: DbService,

  ) { }

  async create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<any> {
    if (createUserDto?.email) {
      // const query = `SELECT * FROM learning.users where email = '${createUserDto?.email}' and deleted_at is null`;
      // console.log(query)
      //const isUserExist = await this.userRepository.query(query);

      const isUserExist = await this.findByUsername(createUserDto?.email);
      if (!isUserExist) {
        const filePath = await this.fileService.uploadFile(file)
        console.log(filePath, " filePath")
        const newcreateUser = await this.userRepository.create(
          {
            ...createUserDto,
            image: filePath
          }
        )
        const createUser = await this.userRepository.save(newcreateUser)

        return ApiResponse(201, "user register successfully", createUser)
      } else {
        return ApiResponse(403, "user already esist", isUserExist)
      }
    }
  }

  async findByUsername(email: string) {
    try {
      const query = `SELECT * FROM learning.users where email = '${email}' and deleted_at is null`;
      const user = await this.userRepository.query(query);
      return user[0]
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: UserDataQueryParam) {

    //const {page, perPage, sortBy, sortOrder, q, fromDate, toDate, currentPage, limit} = params ;

    const page = params.page ? params.page || 1 : 1;
    const limit = params.perPage ? params.perPage || 10 : 10;
    const sortBy = params.sortBy || 'created_at';
    const sortOrder = params.sortOrder || 'desc';

    let whereCond = '';
    let query = '';

    if (params.q) {
      whereCond += `AND (user.first_name LIKE '%${params.q}%') OR user.last_name LIKE '%${params.q}%') OR user.email LIKE '%${params.q}%') `;
    }

    if (params.fromDate && params.toDate) {
      whereCond += `AND (user.created_at BETWEEN '${params.fromDate}' AND '${params.toDate}') `;
    } else if (params.fromDate) {
      whereCond += `AND (user.created_at >= '${params.fromDate}') `;
    } else if (params.toDate) {
      whereCond += `AND (user.created_at <= '${params.toDate}') `;
    }

    if (params.role) {
      whereCond += `AND user.role = '${params.role}' `;
    }

    query = `SELECT * FROM learning.users user where user.deleted_at is null ${whereCond}`;

    if (sortBy && sortOrder) {
      query += ` ORDER BY ${sortBy} ${sortOrder} `;
    }

    const docCnt = await this.userRepository.query(
      `select count(*) as totalCount from (${query}) as t`,
    );

    query += ` LIMIT ${(page - 1) * limit}, ${limit}`;

    const result = await this.userRepository.query(query);

    const data: any = await this.dbService.getPaginationResponse({
      items: result,
      meta: {
        currentPage: page,
        totalItems: docCnt[0].totalCount,
        itemsPerPage: limit,
      },
    })

    return data;
    //console.log(data)

  }

  async getAcademicRecordById(id: number) {
    try {
      const data = await this.recordGrpcService.getRecordById(id);
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }



  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
