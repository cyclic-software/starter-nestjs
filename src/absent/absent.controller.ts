import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AbsentService } from './absent.service';
import { CreateAbsentDto } from './dto/create-absent.dto';
import { ResponseHelper } from 'src/general/response.helper';
import { Type } from './dto/type.enum';
import LocalInterceptor from 'src/users/interceptor/local.interceptor';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('absent')
export class AbsentController {
  constructor(private readonly absentService: AbsentService) {}

  @UseInterceptors(
    LocalInterceptor({
      fieldName: 'file',
      path: 'absent-in',
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
  @Post('in')
  async checkIn(
    @Body() createAbsentDto: CreateAbsentDto,
    @Req() request: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = request?.user;
    const data = await this.absentService.create(
      createAbsentDto,
      user,
      Type.IN,
      {
        path: file?.path,
        filename: file?.filename,
        mimetype: file?.mimetype,
      },
    );
    return ResponseHelper.success(data);
  }

  @UseInterceptors(
    LocalInterceptor({
      fieldName: 'file',
      path: 'absent-out',
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
  @Post('out')
  async checkOut(
    @Body() createAbsentDto: CreateAbsentDto,
    @Req() request: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = request?.user;
    const data = await this.absentService.create(
      createAbsentDto,
      user,
      Type.OUT,
      {
        path: file?.path,
        filename: file?.filename,
        mimetype: file?.mimetype,
      },
    );
    return ResponseHelper.success(data);
  }

  @Get(':idAbsent')
  async getDetail(@Param('idAbsent') idAbsent: number) {
    const detail = await this.absentService.detail(idAbsent);
    return ResponseHelper.success(detail);
  }

  @Get('users/:idUsers')
  async getByUsers(@Param('idUsers') idUsers: number) {
    const data = await this.absentService.getByUsers(idUsers);
    return ResponseHelper.success(data);
  }

  @Get('image/:type/:id')
  async getImage(
    @Param('type') type: string,
    @Param('id') id: number,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const absent = await this.absentService.findByIdandType(id, type);
    if (!absent.path) {
      return {
        success: false,
        data: [],
        message: 'No-Image',
      };
    }
    const stream = createReadStream(join(process.cwd(), absent.path));
    response.set({
      'Content-Disposition': `inline; filename="${absent.filename}"`,
      'Content-Type': absent.mimetype,
    });
    return new StreamableFile(stream);
  }
}
