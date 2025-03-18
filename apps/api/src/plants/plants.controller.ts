import { Controller, Get, Query, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { QueryPlantsDto } from './dto/query-plants.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PlantFamilyQuery } from './dto/plant-family-query.dto';
import { QuerySeriedDto } from './dto/query-seried.dto';
import { PartialUpdatePlanterVariantDto, UpdatePlanterVariantDto } from './dto/update-planter-varients.dto';

@Controller('plants')
export class PlantsController {
  constructor(
    private readonly plantsService: PlantsService
  ) { }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  // @UseGuards(JwtBearerAuthGuard)
  async findAll(@Query() query: QueryPlantsDto) {
    return this.plantsService.findAll(query);
  }

  // @UseGuards(JwtBearerAuthGuard)
  @Get('series')
  async findAllPlantFamily(@Query() query: PlantFamilyQuery) {
    return this.plantsService.findAllPlantFamily(query);
  }

  // @UseGuards(JwtBearerAuthGuard)
  @Get('collection')
  async findAllSeries(@Query() query: QueryPlantsDto) {
    return this.plantsService.findAllForCatalogue(query);
  }


  @Get('collection/:id')
  // @UseGuards(JwtBearerAuthGuard)
  async findOneSeries(@Param('id') id: string, @Query() query: QuerySeriedDto) {
    return this.plantsService.findOneSeries(id, query);
  }

  @Get('planter-variants')
  // @UseGuards(JwtBearerAuthGuard)
  async findAllPlanterVariants() {
    return this.plantsService.findAllPlanterVariants();
  }

  @Get(':id')
  // @UseGuards(JwtBearerAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdatePlantDto) {
    return this.plantsService.update(id, updateData);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.plantsService.remove(id);
  }


  // @UseGuards(JwtAuthGuard)
  @Delete(':id/images/:imageId')
  async removeImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.plantsService.removeImage(id, imageId);
  }



  // @UseGuards(JwtAuthGuard)
  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPlantImage(@Param('id') plantId: string, @UploadedFile() file: Express.Multer.File) {
    return this.plantsService.uploadPlantImage(file, plantId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':id/planter-variants')
  async addPlanterVariant(@Param('id') plantId: string, @Body() createDto: UpdatePlanterVariantDto) {
    const updatedPlant = await this.plantsService.addPlanterVariant(
      plantId,
      createDto
    );
    return updatedPlant;
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id/planter-variants/:planterSku')
  async deletePlanterVariant(@Param('id') plantId: string, @Param('planterSku') planterSku: string) {
    await this.plantsService.deletePlanterVariant(plantId, planterSku);
  }


  // @UseGuards(JwtAuthGuard)
  @Post(':id/planter-variants/:planterSku/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPlanterVariantImages(@Param('id') plantId: string, @Param('planterSku') planterSku: string, @UploadedFile() file: Express.Multer.File) {
    console.log("uploadPlanterVariantImages")
    await this.plantsService.uploadPlanterVariantImages(plantId, planterSku, file);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id/planter-variants/:planterSku')
  async updatePlanterVariant(@Body() updateDto: PartialUpdatePlanterVariantDto, @Param('id') plantId: string, @Param('planterSku') planterSku: string) {
    await this.plantsService.updatePlanterVariant(updateDto, plantId, planterSku);
  }

}
