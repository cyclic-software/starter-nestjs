import { Controller } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentEntity } from './tournament.entity';


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

    @Post('/update/:id')
    update(@Param() id: number, @Body() arch: TournamentEntity) {
        return this.tournamentService.update(id, arch)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }


    @Get('delete/:id')
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
