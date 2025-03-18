// src/azure-blob/azure-blob.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AzureBlobService {
    private containerName: string;
    private blobServiceClient: BlobServiceClient;

    constructor(private readonly configService: ConfigService) {
        console.log("AZURE_STORAGE_CONNECTION_STRING", this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING'))
        const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
        this.containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER') || 'leaffyearth';

        if (!connectionString) {
            throw new Error('Azure Storage connection string not provided');
        }

        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }



    async uploadPlantImage(file: Express.Multer.File, plantId: string): Promise<string> {

        try {
            const containerClient = this.blobServiceClient.getContainerClient(this.containerName);

            const uuidPlant = uuidv4().split('-')[0];
            const blobName = `plants/${plantId}/${uuidPlant}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            await blockBlobClient.uploadData(file.buffer, {
                blobHTTPHeaders: { blobContentType: file.mimetype },
            });

            return blockBlobClient.url;
        } catch (error) {
            const { message } = error as Error;
            throw new InternalServerErrorException('Failed to upload plant image to Azure Blob', message);
        }
    }

    async uploadPlanterImage(file: Express.Multer.File, planterId: string): Promise<string> {

        try {
            const containerClient = this.blobServiceClient.getContainerClient(this.containerName);

            const uuidPlant = uuidv4().split('-')[0];
            const blobName = `planters/${planterId}/${uuidPlant}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            await blockBlobClient.uploadData(file.buffer, {
                blobHTTPHeaders: { blobContentType: file.mimetype },
            });

            return blockBlobClient.url;
        } catch (error) {
            const { message } = error as Error;
            throw new InternalServerErrorException('Failed to upload planter image to Azure Blob', message);
        }
    }
}
