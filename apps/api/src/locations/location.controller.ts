// src/locations/locations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationsService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { QueryLocationsDto } from './dto/query-locations.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new location' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves all locations based on the provided query parameters',
  })
  findAll(@Query() query: QueryLocationsDto) {
    return this.locationsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves a specific location by its ID.' })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Updates a specific location by its ID using the provided update data.',
  })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a specific location by its ID.',
  })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
