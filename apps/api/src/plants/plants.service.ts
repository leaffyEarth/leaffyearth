import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePlantDto } from './dto/create-plant.dto';
import { Plant, PlantDocument } from '../models/plant.schema';
import { QueryPlantsDto } from './dto/query-plants.dto';
import { SkuService } from '../common/services/sku.service';
import { productEnum, catalogPlantResponse } from '@leaffyearth/utils';
import { AzureBlobService } from '../azure-blob/azure-blob.service';
import { PlantFamilyQuery } from './dto/plant-family-query.dto';
import { QuerySeriedDto } from './dto/query-seried.dto';
import {
  PartialUpdatePlanterVariantDto,
  UpdatePlanterVariantDto,
} from './dto/update-planter-variant.dto';
import { CreatePotDto } from '../pots/dto/create-planter.dto';
import { PlanterService } from '../pots/planter.service';
import { planterCategoryEnum } from '@leaffyearth/utils';
import { ColorDto } from '../common/dto/color.dto';
import { sizeEnum } from '@leaffyearth/utils';
import { Pot, PotDocument } from '../models/pot.schema';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name) private plantModel: Model<PlantDocument>,
    @InjectModel(Pot.name) private planterModel: Model<PotDocument>,
    private readonly skuService: SkuService,
    private readonly azureBlobService: AzureBlobService,
    private readonly planterService: PlanterService,
  ) {}

  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    const sku = this.skuService.generatePlantSku(
      productEnum.PLANT,
      createPlantDto.plantSeries,
      createPlantDto.size,
    );
    const existing = await this.plantModel.findOne({ sku }).exec();
    if (existing) {
      throw new ConflictException('SKU already exists');
    }
    const plant = new this.plantModel({ ...createPlantDto, sku });

    return plant.save();
  }

  async findAll(
    query: QueryPlantsDto,
  ): Promise<{ data: Plant[]; page: number; limit: number; total: number }> {
    const page = parseInt(query.page ?? '1', 10) || 1;
    const limit = parseInt(query.limit ?? '10', 10) || 10;
    const skip = (page - 1) * limit;

    let fields = '';
    if (query.fields) {
      fields = query.fields.replace(/,/g, ' ');
    }

    const filter: Record<string, any> = {};

    // Add series (plantSeries) filter
    if (query.plantSeries) {
      filter.plantSeries = query.plantSeries;
    }

    // Add price range filter
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) {
        filter.price.$gte = Number(query.minPrice);
      }
      if (query.maxPrice) {
        filter.price.$lte = Number(query.maxPrice);
      }
    }

    try {
      const [data, total] = await Promise.all([
        this.plantModel
          .find(filter)
          .select(fields)
          .sort(this.getSortOptions(query.sortBy))
          .skip(skip)
          .limit(limit)
          .exec(),
        this.plantModel.countDocuments(filter).exec(),
      ]);
      return {
        data,
        page,
        limit,
        total,
      };
    } catch (err) {
      console.error(`failed to fetch plant service ${err}`);
      throw new NotFoundException('exeption');
    }
  }

  // Helper function to get sort options
  private getSortOptions(sortBy?: string): Record<string, 1 | -1> {
    switch (sortBy) {
      case 'price_asc':
        return { price: 1 };
      case 'price_desc':
        return { price: -1 };
      case 'rating':
        return { rating: -1 };
      case 'newest':
        return { createdAt: -1 };
      default:
        return { createdAt: -1 }; // Default sort by newest
    }
  }

  async findAllPlantFamily(
    query: PlantFamilyQuery,
  ): Promise<Array<{ _id: string; totalCount: number }>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const limit = 10;

    const pipeline: any[] = [];

    if (query.search) {
      pipeline.push({
        $match: {
          plantSeries: {
            $regex: query.search,
            $options: 'i', // case-insensitive
          },
        },
      });
    }

    pipeline.push({
      $match: {
        plantSeries: { $ne: null },
      },
    });

    pipeline.push({
      $group: {
        _id: '$plantSeries', // distinct plantSeries
        totalCount: { $sum: 1 }, // how many plants in that series
      },
    });

    pipeline.push({ $sort: { _id: 1 } });

    const data = await this.plantModel.aggregate(pipeline).exec();

    return data;
  }

  async findOne(id: string): Promise<Plant> {
    const plant = await this.plantModel.findById(id).exec();
    if (!plant) throw new NotFoundException('Plant not found');
    return plant;
  }

  async update(
    id: string,
    updateData: Partial<CreatePlantDto>,
  ): Promise<Plant> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...rest } = updateData;

    const plant = await this.plantModel
      .findByIdAndUpdate(id, rest, { new: true })
      .exec();
    if (!plant) throw new NotFoundException('Plant not found');
    return plant;
  }

  async remove(id: string): Promise<Plant> {
    const plant = await this.plantModel.findByIdAndDelete(id).exec();
    if (!plant) throw new NotFoundException('Plant not found');
    return plant;
  }

  async findAllForCatalogue(query: QueryPlantsDto): Promise<{
    data: catalogPlantResponse[];
    page: number;
    limit: number;
    total: number;
  }> {
    const page = parseInt(query.page ?? '1', 10) || 1;
    const limit = parseInt(query.limit ?? '10', 10) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    function setInFilter(fieldName: keyof QueryPlantsDto & string) {
      const val = query[fieldName];
      if (val && typeof val === 'string') {
        const array = val.split(',');
        filter[fieldName] = { $in: array };
      }
    }


    const pipeline: any[] = [];

    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }

    pipeline.push({
      $group: {
        _id: '$plantSeries',
        plants: {
          $push: {
            _id: '$_id',
            name: '$name',
            size: '$size',
            images: '$images',
            price: '$price',
            thumbnail: '$thumbnail',
            sku: '$sku',
          },
        },
        count: { $sum: 1 },
      },
    });

    pipeline.push({ $skip: skip }, { $limit: limit });

    const countPipeline = [...pipeline];
    countPipeline.push({ $count: 'total' });

    const [data, countResult] = await Promise.all([
      this.plantModel.aggregate(pipeline).exec(),
      this.plantModel.aggregate(countPipeline).exec(),
    ]);

    const total = countResult?.[0]?.total || 0;

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async findOneSeries(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: QuerySeriedDto,
  ): Promise<catalogPlantResponse> {
    const pipeline: any[] = [];

    const formattedId = id.toLowerCase().trim().replace(/-/g, ' ');

    pipeline.push({
      $match: {
        plantSeries: { $eq: formattedId },
      },
    });

    pipeline.push({
      $group: {
        _id: '$plantSeries',
        plants: {
          $push: {
            _id: '$_id',
            name: '$name',
            description: '$description',
            size: '$size',
            images: '$images',
            price: '$price',
            thumbnail: '$thumbnail',
            sku: '$sku',
            planterVariants: '$planterVariants',
          },
        },
        count: { $sum: 1 },
      },
    });

    pipeline.push({ $limit: 1 });
    const plantSeries = await this.plantModel.aggregate(pipeline).exec();

    if (plantSeries.length === 0)
      throw new NotFoundException('Plant Series not found');

    return plantSeries[0];
  }

  // async findAllPlanterVariants(): Promise<PlanterVariantType[]> {
  //     return PlanterVariants
  // }

  async findAllPlanterVariants(): Promise<Partial<CreatePotDto[]>> {
    const planters = await this.planterService.getAllPlanters();
    return planters.map((planter) => {
      if (
        !Object.values(planterCategoryEnum).includes(
          planter.planterCategory as planterCategoryEnum,
        )
      ) {
        throw new Error(`Invalid planterCategory: ${planter.planterCategory}`);
      }
      return {
        name: planter.name,
        planterCategory: planter.planterCategory as planterCategoryEnum,
        planterSeries: planter.planterSeries,
        dimensions: planter.dimensions,
        color: planter.color as ColorDto,
        price: planter.price,
        images: planter.images,
        size: planter.size as sizeEnum,
        sku: planter.sku,
        description: planter.description || '',
      };
    });
  }

  async removeImage(id: string, imageId: string): Promise<Plant> {
    const plant = await this.plantModel.findById(id).exec();
    if (!plant) throw new NotFoundException('Plant not found');

    const images = plant.images.filter((imageUrl) => {
      let imageName: string = '';
      const segments = imageUrl.split('/');
      imageName = segments[segments.length - 1];
      return imageName !== imageId;
    });

    plant.images = images;
    await plant.save();
    return plant;
  }

  async uploadPlantImage(file: Express.Multer.File, plantId: string) {
    const plant = await this.plantModel.findById(plantId).exec();
    if (!plant) throw new NotFoundException('Plant not found');

    const blobUrl = await this.azureBlobService.uploadPlantImage(file, plantId);

    plant.images.push(blobUrl);
    await plant.save();

    return { plantId, blobUrl };
  }

  // related to variants
  async addPlanterVariant(plantId: string, createDto: UpdatePlanterVariantDto) {
    const plant = await this.plantModel.findById(plantId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    // Verify that the planter exists
    const planter = await this.planterModel.findById(createDto.planter);
    if (!planter) {
      throw new NotFoundException('Planter not found');
    }

    // Check if the planter variant already exists
    const existingVariant = plant.planterVariants?.find(
      variant => variant.planter.toString() === createDto.planter
    );

    if (existingVariant) {
      throw new ConflictException('This planter variant already exists for this plant');
    }

    // Add the new variant
    if (!plant.planterVariants) {
      plant.planterVariants = [];
    }

    plant.planterVariants.push({
      planter: new Types.ObjectId(createDto.planter),
      images: createDto.images || []
    });

    return plant.save();
  }

  async updatePlanterVariant(
    updateDto: PartialUpdatePlanterVariantDto,
    plantId: string,
    planterId: string,
  ) {
    const plant = await this.plantModel.findById(plantId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    const variant = plant.planterVariants?.find(
      (v) => v.planter.toString() === planterId,
    );

    if (!variant) {
      throw new NotFoundException(
        `Planter variant with ID '${planterId}' not found in Plant '${plantId}'.`,
      );
    }

    variant.images = updateDto.images ?? [];

    await plant.save();
  }

  async deletePlanterVariant(plantId: string, planterId: string) {
    const plant = await this.plantModel.findById(plantId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    const variantIndex = plant.planterVariants?.findIndex(
      (v) => v.planter.toString() === planterId,
    );

    if (variantIndex === -1) {
      throw new NotFoundException(
        `Planter variant with ID '${planterId}' not found in Plant '${plantId}'.`,
      );
    }

    if (typeof variantIndex === 'number' && variantIndex >= 0) {
      plant.planterVariants?.splice(variantIndex, 1);
    } else {
      throw new NotFoundException(
        `Planter variant with ID '${planterId}' not found in Plant '${plantId}'.`,
      );
    }

    await plant.save();
  }

  async uploadPlanterVariantImages(
    plantId: string,
    planterId: string,
    file: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    const blobUrl = await this.azureBlobService.uploadPlantImage(file, plantId);
    const plant = await this.plantModel.findById(plantId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    const variant = plant.planterVariants?.find(
      (v) => v.planter.toString() === planterId,
    );

    if (!variant) {
      throw new NotFoundException(
        `Planter variant with ID '${planterId}' not found in Plant '${plantId}'.`,
      );
    }

    variant.images.push(blobUrl);
    await plant.save();
  }

  async getAllPlantIds(): Promise<{ data: string[] }> {
    try {
      const plants = await this.plantModel.find().select('_id').lean().exec();
      return {
        data: plants.map(plant => plant._id.toString())
      };
    } catch (error) {
      console.error('Failed to fetch plant IDs:', error);
      throw new BadRequestException('Failed to fetch plant IDs');
    }
  }

  async getAllSeries(): Promise<{ data: string[] }> {
    try {
      const series = await this.plantModel.distinct('plantSeries').exec();
      return {
        data: series
      };
    } catch (error) {
      console.error('Failed to fetch series:', error);
      throw new BadRequestException('Failed to fetch series');
    }
  }

  async getPlantBySeries(series: string): Promise<{ data: Plant[] }> {
    try {
      const plants = await this.plantModel
        .find({ plantSeries: series })
        .populate({
          path: 'planterVariants.planter',
          model: 'Pot',
          select: 'name planterCategory planterSeries dimensions color price images size sku description'
        })
        .exec();
      return {
        data: plants
      };
    } catch (error) {
      console.error('Failed to fetch plants by series:', error);
      throw new BadRequestException('Failed to fetch plants by series');
    }
  }
}
