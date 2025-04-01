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
// import { PlanterFamilyQuery } from './dto/planter-family-query.dto';

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

    const [data, total] = await Promise.all([
      this.potModel.find().select(fields).skip(skip).limit(limit).exec(),
      this.potModel.countDocuments().exec(),
    ]);

    return { data, page, limit, total };
  }

  async findOne(id: string): Promise<Pot> {
    const pot = await this.potModel.findById(id).exec();
    if (!pot) throw new NotFoundException('Pot not found');
    return pot;
  }

  // async findAllPlanterFamily(
  //   query: PlanterFamilyQuery,
  // ): Promise<Array<{ planterSeries: string; totalCount: number }>> {
  // const pipeline: any[] = [];

  // if (query.search) {
  //   pipeline.push({
  //     $match: {
  //       planterSeries: { $regex: query.search, $options: 'i' },
  //     },
  //   });
  // }

  // pipeline.push({
  //   $match: { planterSeries: { $ne: null } },
  // });

  // pipeline.push({
  //   $group: {
  //     _id: { $toString: '$planterSeries' }, // ✅ Fix: Convert _id to string
  //     totalCount: { $sum: 1 },
  //   },
  // });

  // pipeline.push({ $sort: { _id: 1 } });

  // pipeline.push({
  //   $project: {
  //     planterSeries: '$_id',
  //     totalCount: 1,
  //     _id: 0,
  //   },
  // });

  // const data = await this.potModel.aggregate(pipeline).exec();
  // return data;

  // }

  // async findAllPlanterFamily(
  //   query: PlanterFamilyQuery,
  // ): Promise<Array<{ _id: string; totalCount: number }>> {
  //   const pipeline: any[] = [];

  //   if (query.search) {
  //     pipeline.push({
  //       $match: {
  //         planterSeries: { $regex: query.search, $options: 'i' }, // case-insensitive search
  //       },
  //     });
  //   }

  //   pipeline.push({
  //     $match: { planterSeries: { $ne: null } }, // Exclude null planterSeries
  //   });

  //   pipeline.push({
  //     $addFields: {
  //         plantSeriesString: { $toString: "$plantSeries" },  // Ensure it's a string
  //     },
  // });

  //   pipeline.push({
  //     $group: {
  //       _id: "$plantSeriesString",  // Group by planterSeries
  //       totalCount: { $sum: 1 }, // Count the number of items in each series
  //     },
  //   });

  //   pipeline.push({ $sort: { _id: 1 } }); // Sort by planterSeries alphabetically

  //   // pipeline.push({
  //   //   $project: {
  //   //     planterSeries: '$_id', // Rename _id to planterSeries
  //   //     totalCount: 1,
  //   //     _id: 0, // Exclude _id from the result
  //   //   },
  //   // });

  //   const data = await this.potModel.aggregate(pipeline).exec();

  //   return data.map((item) => ({
  //     _id: String(item._id),  // Ensure `_id` is explicitly a string
  //     totalCount: item.totalCount,
  // }));
  // }

  //   async findAllPlanterFamily(
  //     query: PlanterFamilyQuery
  // ): Promise<Array<{ planterSeries: string; totalCount: number }>> {
  //     const pipeline: any[] = [];

  //     // Match search filter if provided
  //     if (query.search) {
  //         pipeline.push({
  //             $match: {
  //                 planterSeries: {
  //                     $regex: query.search,
  //                     $options: 'i', // case-insensitive
  //                 },
  //             },
  //         });
  //     }

  //     // Exclude null values
  //     pipeline.push({
  //         $match: {
  //             planterSeries: { $ne: null },
  //         },
  //     });

  //     // Collect all unique plantSeries into an array
  //     pipeline.push({
  //         $group: {
  //             _id: null,
  //             uniquePlanterSeries: { $addToSet: "$planterSeries" },
  //         },
  //     });

  //     // Unwind the array to get individual plantSeries
  //     pipeline.push({
  //         $unwind: "$uniquePlanterSeries",
  //     });

  //     // Count occurrences of each plantSeries
  //     pipeline.push({
  //         $group: {
  //             _id: "$uniquePlanterSeries",
  //             totalCount: { $sum: 1 },
  //         },
  //     });

  //     // Sort alphabetically
  //     pipeline.push({ $sort: { _id: 1 } });

  //     // Rename `_id` to `plantSeries`
  //     pipeline.push({
  //         $project: {
  //             planterSeries: "$_id",
  //             totalCount: 1,
  //             _id: 0,
  //         },
  //     });

  //     // Execute aggregation pipeline
  //     return await this.potModel.aggregate(pipeline).exec();
  // }

  async findAllPlanterFamily(): Promise<string[]> {
    const allPlanters = await this.potModel.find().exec();
    const seriesList = allPlanters.map((planter) => planter.planterSeries);
    return Array.from(new Set(seriesList)); // Remove duplicates
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
