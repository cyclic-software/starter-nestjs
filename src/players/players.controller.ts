import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersEntity } from './players.entity';

import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@Controller('players')
export class PlayersController {

    constructor(
        private playersService : PlayersService
    ){}

    @Get()
    get() {
        return this.playersService.findAll()
            .then(res => {
                return res
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }

    @Get('/:id')
    getbyID(@Param('id') id: number) {
        return this.playersService.findById(id)
            .then(res => {
                return res
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Post()
    save(@Body() nuevo: PlayersEntity) {
        return this.playersService.create(nuevo)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Post('/bulk')
    saveBulk(@Body() nuevo: PlayersEntity[]) {
        return this.playersService.createBulk(nuevo)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Post('/update/:id')
    update(@Param('id') id: number, @Body() arch: PlayersEntity) {
        return this.playersService.update(id, arch)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Get('delete/:id')
    delete(@Param('id') id) {
        return this.playersService.delete(id)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

}
