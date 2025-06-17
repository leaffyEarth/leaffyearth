// src/pots/pots.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PlanterService } from './planter.service';
import { CreatePotDto } from './dto/create-planter.dto';
import { QueryPotsDto } from './dto/query-planters.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlanterFamilyQuery } from './dto/planter-family-query.dto';

// @UseGuards(JwtAuthGuard)
@ApiTags('planters')
@Controller('planters')
export class PlantersController {
  constructor(private readonly planterService: PlanterService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Creates a new planter' })
  async create(@Body() createPotDto: CreatePotDto) {
    return this.planterService.create(createPotDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Retrieves all planters based on the provided query parameters',
  })
  async findAll(@Query() query: QueryPotsDto) {
    return this.planterService.findAll(query);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('series')
  @ApiOperation({
    summary: 'Retrieves all planter series based on the provided query parameters',
  })
  async findAllPlanterFamily(@Query() query: PlanterFamilyQuery) {
    return this.planterService.findAllPlanterFamily(query);
  }

  @Get('getPlantersBySeries')
  @ApiOperation({
    summary: 'Retrieves all planters by series based on the provided query parameters',
  })
  async getPlantersBySeries(@Query('series') series: string) {
    return this.planterService.getPlantersBySeries(series);
  }
  
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieves a specific planter by its ID.' })
  async findOne(@Param('id') id: string) {
    return this.planterService.findOne(id);
  }


  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary:
      'Updates a specific planter by its ID using the provided update data.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreatePotDto>,
  ) {
    return this.planterService.update(id, updateData);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id/images/:imageId')
  @ApiOperation({
    summary:
      'Removes a specific image from a planter by its ID and the image ID',
  })
  async removeImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
  ) {
    return this.planterService.removeImage(id, imageId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload-image')
  @ApiOperation({ summary: 'Upload an image for a specific planter by its ID' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPlanterImage(
    @Param('id') planterId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.planterService.uploadPlanterImage(file, planterId);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a specific planter by its ID.' })
  async remove(@Param('id') id: string) {
    return this.planterService.remove(id);
  }
}
