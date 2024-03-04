import { Controller } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TierlistService } from './tierlistt.service';
import { TierlistEntity } from './tierlist.entity';

@Controller('tierlist')
export class TierlistController {

    constructor(private tierlistService: TierlistService) { }

    @Get()
    get() {
        return this.tierlistService.findAll()
            .then(res => {
                return res
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }

    @Post()
    save(@Body() nuevo: TierlistEntity) {
        return this.tierlistService.create(nuevo)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @Post('/update/:id')
    update(@Param('id') id: number, @Body() arch: TierlistEntity) {
        return this.tierlistService.update(id, arch)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }


    @Get('/delete/:id')
    delete(@Param('id') id) {
        return this.tierlistService.delete(id)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

}
