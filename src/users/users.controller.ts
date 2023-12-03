import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHelper } from 'src/general/response.helper';
import { Express, Response } from 'express';
import LocalInterceptor from './interceptor/local.interceptor';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(
    LocalInterceptor({
      fieldName: 'file',
      path: 'photo',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(Number(process.env.FILE_MAX_SIZE), 2), // 1 Mb
      },
    }),
  )
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const data = await this.usersService.create(createUserDto, {
      path: file?.path,
      filename: file?.originalname,
      mimetype: file?.mimetype,
    });
    return ResponseHelper.success(data);
  }

  @Get('image')
  async getImage(
    @Req() request: any,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const payload = request?.user;
    const user = await this.usersService.findOne(payload.id);
    if (!user.path) {
      return {
        success: false,
        data: [],
        message: 'No-Image',
      };
    }
    const stream = createReadStream(join(process.cwd(), user.path));
    response.set({
      'Content-Disposition': `inline; filename="${user.filename}"`,
      'Content-Type': user.mimetype,
    });
    return new StreamableFile(stream);
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return ResponseHelper.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(+id);
    return ResponseHelper.success(data);
  }

  @UseInterceptors(
    LocalInterceptor({
      fieldName: 'file',
      path: 'photo',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(Number(process.env.FILE_MAX_SIZE), 2), // 1 Mb
      },
    }),
  )
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const data = await this.usersService.update(+id, updateUserDto, {
      path: file?.path,
      filename: file?.originalname,
      mimetype: file?.mimetype,
    });
    return ResponseHelper.success(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const remove = await this.usersService.remove(+id);
    return ResponseHelper.success(remove);
  }

  @Get('get/me')
  async getMe(@Req() request: any) {
    const user = request?.user;
    const getMe = await this.usersService.getMe(user);
    return ResponseHelper.success(getMe);
  }
}
