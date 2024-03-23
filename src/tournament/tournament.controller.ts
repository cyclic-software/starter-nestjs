import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentEntity } from './tournament.entity';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';


@Controller('tournament')
export class TournamentController {
    
    constructor(
        private tournamentService : TournamentService
    ){}

    @Get()
    get() {
        return this.tournamentService.findAll()
            .then(res => {
                return res
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }

    @Get('/:id')
    getbyID(@Param('id') id: number) {
        return this.tournamentService.findById(id)
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
    save(@Body() nuevo: TournamentEntity) {
        return this.tournamentService.create(nuevo)
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
    update(@Param("id") id: number, @Body() arch: TournamentEntity) {
        return this.tournamentService.update(id, arch)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error,  HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }


    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Get('/delete/:id')
    delete(@Param('id') id) {
        return this.tournamentService.delete(id)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

}
