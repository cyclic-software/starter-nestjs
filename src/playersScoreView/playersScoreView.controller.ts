import { Controller } from '@nestjs/common';
import {  Get, HttpException, HttpStatus } from '@nestjs/common';
import { PlayersScoreViewService } from './playersScoreView.service';

@Controller('playersview')
export class PlayersScoreViewController {

    constructor(
        private playersScoreViewService: PlayersScoreViewService
    ) { }



    @Get()
    get() {
        return this.playersScoreViewService.findAll()
            .then(res => {
                return res
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }






}
