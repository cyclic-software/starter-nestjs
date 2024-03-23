import { Controller, Param } from '@nestjs/common';
import {  Get, HttpException, HttpStatus } from '@nestjs/common';
import { ResultsViewService } from './resultsView.service';

@Controller('resultsview')
export class ResultsViewController {

    constructor(
        private resultsService: ResultsViewService
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


    @Get('/:filter/:id')
    getByTournament(@Param('filter') filter,@Param('id') id) {
        return this.resultsService.findByPK(filter, id)
            .then(
                res => {
                    return res;
                })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }






}
