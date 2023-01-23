
const apiUrl = 'https://zi9b8xsi91.execute-api.eu-west-1.amazonaws.com/prod/';

export const config = {
    REGION: 'eu-west-1',
    USER_POOL_ID: 'eu-west-1_2XB6Ce1I9',
    APP_CLIENT_ID: '2sj3q52d4m53pg7uaa5d2f8bh5',
    IDENTITY_POOL_ID: 'eu-west-1:e26f0e98-451a-43b4-bcb9-4f9e896b6fae',
    SPACES_PHOTOS_BUCKET: 'spaces-photos-2fd6e810-97ed-11ed-90b8-06b009c21ee1',
    api: {
        baseUrl: apiUrl,
        spacesUrl: `${apiUrl}spaces`
    }
}