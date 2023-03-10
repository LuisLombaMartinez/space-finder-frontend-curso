import { config, S3 } from "aws-sdk";
import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";
import { generateRandomId } from "../utils/Utils";
import { config as appConfig } from "./config";

config.update({
    region: appConfig.REGION
})

export class DataService {

    private s3Client = new S3({
        region: appConfig.REGION
    }) 

    public async createSpace(iCreateSpace: ICreateSpaceState) {
        if (iCreateSpace.photo) {
            const photoUrl = await this.uploadPublicFile(iCreateSpace.photo, appConfig.SPACES_PHOTOS_BUCKET);
            iCreateSpace.photoURL = photoUrl;
            iCreateSpace.photo = undefined;
        }
        const requestUrl = appConfig.api.spacesUrl;
        const requestOptions: RequestInit = {
            method: 'POST',
            body: JSON.stringify(iCreateSpace)
        }
        const requestResult = await fetch(requestUrl, requestOptions);
        const result = await requestResult.json();
        return JSON.stringify(result.id);
    }

    private async uploadPublicFile(file: File, bucket: string) {
        const fileName = file.name + generateRandomId();
        // const fileName = file.name;

        const uploadResult = await new S3({region: appConfig.REGION}).upload({
            Bucket: bucket,
            Key: fileName,
            Body: file,
            ACL: 'public-read'
        }).promise();
        return uploadResult.Location;
    }

    public async getSpaces(): Promise<Space[]> {
        const requestUrl = appConfig.api.spacesUrl;
        const requestResult = await fetch(
            requestUrl, {
                method: 'GET',
            }
        )
        const result = await requestResult.json();
        return result;
    }

    public async reserveSpace(spaceId: string): Promise<string | undefined> {
        if (spaceId === '123') {
            return ('5555');
        } else {
            return undefined;
        }

    }
}