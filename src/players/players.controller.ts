import { Controller } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersEntity } from './players.entity';

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
