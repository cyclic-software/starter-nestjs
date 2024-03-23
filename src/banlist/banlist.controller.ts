import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { BanlistService } from './banlist.service';
import { BanlistEntity } from './banlist.entity';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('banlist')
export class BanlistController {

    constructor(private banlistService: BanlistService) { }


    @Get()
    get() {
        return this.banlistService.findAll()
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
    save(@Body() nuevo: BanlistEntity) {
        return this.banlistService.create(nuevo)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Post('/update/:id_ban')
    update(@Param('id_ban') id_ban: number, @Body() arch: BanlistEntity) {
        return this.banlistService.update(id_ban, arch)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Get('/delete/:id')
    delete(@Param('id') id) {
        return this.banlistService.delete(id)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

}
