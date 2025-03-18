// src/pots/pots.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { PlanterService } from './planter.service';
import { CreatePotDto } from './dto/create-planter.dto';
import { QueryPotsDto } from './dto/query-planters.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';


@UseGuards(JwtAuthGuard)
@Controller('planters')
export class PlantersController {
  constructor(private readonly planterService: PlanterService) { }

  @Post()
  async create(@Body() createPotDto: CreatePotDto) {
    return this.planterService.create(createPotDto);
  }

  @Get()
  async findAll(@Query() query: QueryPotsDto) {
    return this.planterService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.planterService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<CreatePotDto>) {
    return this.planterService.update(id, updateData);
  }

  @Delete(':id/images/:imageId')
  async removeImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.planterService.removeImage(id, imageId);
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPlantImage(@Param('id') planterId: string, @UploadedFile() file: Express.Multer.File) {
    return this.planterService.uploadPlanterImage(file, planterId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.planterService.remove(id);
  }
}
