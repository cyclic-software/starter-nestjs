import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { IjinService } from './ijin.service';
import { CreateIjinDto } from './dto/create-ijin.dto';
import { UpdateIjinDto } from './dto/update-ijin.dto';
import LocalInterceptor from 'src/users/interceptor/local.interceptor';
import { ResponseHelper } from 'src/general/response.helper';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('ijin')
export class IjinController {
  constructor(private readonly ijinService: IjinService) {}

  @UseInterceptors(
    LocalInterceptor({
      fieldName: 'file',
      path: 'ijin',
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
  create(
    @Body() createIjinDto: CreateIjinDto,
    @Req() request: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = request?.user;
    const data = this.ijinService.create(user.id, createIjinDto, {
      path: file?.path,
      filename: file?.originalname,
      mimetype: file?.mimetype,
    });
    return ResponseHelper.success(data);
  }

  @Get()
  async findAll() {
    const data = await this.ijinService.findAll();
    return ResponseHelper.success(data);
  }

  @Get('users/:idUsers')
  async getByUsers(@Param('idUsers') idUsers: number) {
    const data = await this.ijinService.getByUsers(idUsers);
    return ResponseHelper.success(data);
  }

  @Get('image/:id')
  async getImage(
    @Param('id') id: number,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const ijin = await this.ijinService.findOne(id);
    if (!ijin.path) {
      return {
        success: false,
        data: [],
        message: 'No-Image',
      };
    }
    const stream = createReadStream(join(process.cwd(), ijin.path));
    response.set({
      'Content-Disposition': `inline; filename="${ijin.filename}"`,
      'Content-Type': ijin.mimetype,
    });
    return new StreamableFile(stream);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.ijinService.findOne(+id);
    return ResponseHelper.success(data);
  }

  @UseInterceptors(
    LocalInterceptor({
      fieldName: 'file',
      path: 'ijin',
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
    @Body() updateIjinDto: UpdateIjinDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const data = this.ijinService.update(+id, updateIjinDto, {
      path: file?.path,
      filename: file?.originalname,
      mimetype: file?.mimetype,
    });
    return ResponseHelper.success(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.ijinService.remove(+id);
    return ResponseHelper.success(data);
  }

  @Get('count/status')
  async countStatus(@Req() request: any) {
    const user = request?.user;
    const countStatus = await this.ijinService.getCountingStatusIjin(user.id);
    return ResponseHelper.success(countStatus);
  }
}
