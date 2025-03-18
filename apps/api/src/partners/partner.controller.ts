// src/partners/partners.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnersService } from './partner.service';
import { CreatePartnerDto } from './dto/create.partner.dto';

@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Post()
    create(@Body() createPartnerDto: CreatePartnerDto) {
        return this.partnersService.create(createPartnerDto);
    }

    @Get()
    findAll() {
        return this.partnersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.partnersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
        return this.partnersService.update(id, updatePartnerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.partnersService.remove(id);
    }
}
