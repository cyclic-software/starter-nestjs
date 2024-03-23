import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsEntity } from './results.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('results')
export class ResultsController {

    constructor(
        private resultsService: ResultsService
    ) { }



    @Get()
    get() {
        return this.resultsService.findAll()
            .then(res => {
                return res
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }

    @Get('/tournament/:id')
    getByTournament(@Param('id') id) {
        return this.resultsService.findByTournament(id)
            .then(
                res => {
                    return res;
                })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @Get('/player/:id')
    getByPlayer(@Param('id') id) {

        return this.resultsService.findByPlayer(id)
        .then(
            res => {
                return res;
            })
        .catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        })

    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.ADMIN, Role.GOD])
    @Post()
    save(@Body() nuevo: ResultsEntity) {
        return this.resultsService.create(nuevo)
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
    saveBulk(@Body() nuevo: ResultsEntity[]) {
        return this.resultsService.createBulk(nuevo)
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
    update(@Param("id") id: number, @Body() arch: ResultsEntity) {
        return this.resultsService.update(id, arch)
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
        return this.resultsService.delete(id)
            .then(res => {
                return { sucess: true, data: res }
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }
}
