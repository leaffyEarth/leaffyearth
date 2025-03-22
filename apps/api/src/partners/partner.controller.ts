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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('partners')
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Post()
    @ApiOperation({ summary: 'Creates a new partner' })
    create(@Body() createPartnerDto: CreatePartnerDto) {
        return this.partnersService.create(createPartnerDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Retrieves all partners based on the provided query parameters',
    })
    findAll() {
        return this.partnersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieves a specific partner by its ID.' })
    findOne(@Param('id') id: string) {
        return this.partnersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary:
            'Updates a specific partner by its ID using the provided update data.',
    })
    update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
        return this.partnersService.update(id, updatePartnerDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Deletes a specific partner by its ID.',
    })
    remove(@Param('id') id: string) {
        return this.partnersService.remove(id);
    }
}
