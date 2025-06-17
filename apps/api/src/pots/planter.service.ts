// src/pots/pots.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pot, PotDocument } from '../models/pot.schema';
import { CreatePotDto } from './dto/create-planter.dto';
import { QueryPotsDto } from './dto/query-planters.dto';
import { SkuService } from '../common/services/sku.service';
import { productEnum } from '@leaffyearth/utils';
import { AzureBlobService } from '../azure-blob/azure-blob.service';
import { PlanterFamilyQuery } from './dto/planter-family-query.dto';

@Injectable()
export class PlanterService {
  constructor(
    @InjectModel(Pot.name) private readonly potModel: Model<PotDocument>,
    private readonly skuService: SkuService, // We'll use this for SKU generation
    private readonly azureBlobService: AzureBlobService,
  ) {}

  async create(createPotDto: CreatePotDto): Promise<Pot> {
    // Generate a SKU, e.g., "POT", planter category, planter series, size, color
    const sku = this.skuService.generatePlanterSku(
      productEnum.POT,
      createPotDto.planterSeries,
      createPotDto.planterCategory,
      createPotDto.size,
      createPotDto.color.hex,
    );
    const pot = new this.potModel({ ...createPotDto, sku });
    return pot.save();
  }

  async findAll(
    query: QueryPotsDto,
  ): Promise<{ data: Pot[]; page: number; limit: number; total: number }> {
    const page = parseInt(query.page ?? '1', 10) || 1;
    const limit = parseInt(query.limit ?? '10', 10) || 10;
    const skip = (page - 1) * limit;

    // Field selection
    let fields = '';
    if (query.fields) {
      fields = query.fields.replace(/,/g, ' ');
    }

    // Build filter
    const filter: Record<string, any> = {};
    
    // Add search functionality - only by name
    if (query.search) {
      filter.name = { $regex: new RegExp(query.search, 'i') };
    }

    // Add other filters if needed
    if (query.planterCategory) {
      filter.planterCategory = query.planterCategory;
    }
    
    if (query.planterSeries) {
      filter.planterSeries = query.planterSeries;
    }
    
    if (query.size) {
      filter.size = query.size;
    }

    const [data, total] = await Promise.all([
      this.potModel.find(filter).select(fields).skip(skip).limit(limit).exec(),
      this.potModel.countDocuments(filter).exec(),
    ]);

    return { data, page, limit, total };
  }

  async findOne(id: string): Promise<Pot> {
    const pot = await this.potModel.findById(id).exec();
    if (!pot) throw new NotFoundException('Pot not found');
    return pot;
  }

  async getPlantersBySeries(series: string): Promise<Pot[]> {
    const planters = await this.potModel
      .find({ planterSeries: series })
      .exec();
    if (!planters || planters.length === 0) throw new NotFoundException('No planters found for this series');
    return planters;
  }

  async findAllPlanterFamily(
    query: PlanterFamilyQuery,
  ): Promise<Array<{ _id: string; totalCount: number }>> {
    const pipeline: any[] = [];

    if (query.search) {
      pipeline.push({
        $match: {
          planterSeries: {
            $regex: query.search,
            $options: 'i', // case-insensitive
          },
        },
      });
    }

    pipeline.push({
      $match: {
        planterSeries: { $ne: null },
      },
    });

    pipeline.push({
      $group: {
        _id: '$planterSeries', // distinct planterSeries
        totalCount: { $sum: 1 }, // how many planters in that series
      },
    });

    pipeline.push({ $sort: { _id: 1 } });

    const data = await this.potModel.aggregate(pipeline).exec();

    return data;
  }

  async update(id: string, updateData: Partial<CreatePotDto>): Promise<Pot> {
    const pot = await this.potModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!pot) throw new NotFoundException('Pot not found');
    return pot;
  }

  async removeImage(id: string, imageId: string): Promise<Pot> {
    const planter = await this.potModel.findById(id).exec();
    if (!planter) throw new NotFoundException('Plante not found');

    const images = planter.images.filter((imageUrl) => {
      let imageName: string = '';
      const segments = imageUrl.split('/');
      imageName = segments[segments.length - 1];
      return imageName !== imageId;
    });

    planter.images = images;
    await planter.save();
    return planter;
  }

  async uploadPlanterImage(file: Express.Multer.File, planertId: string) {
    const planter = await this.potModel.findById(planertId).exec();
    if (!planter) throw new NotFoundException('Planter not found');

    const blobUrl = await this.azureBlobService.uploadPlanterImage(
      file,
      planertId,
    );

    planter.images.push(blobUrl);
    await planter.save();

    return { planertId, blobUrl };
  }

  async remove(id: string): Promise<Pot> {
    const pot = await this.potModel.findByIdAndDelete(id).exec();
    if (!pot) throw new NotFoundException('Pot not found');
    return pot;
  }

  async getAllPlanters(): Promise<Pot[]> {
    const allPlanters = await this.potModel.find();
    return allPlanters;
  }
}
