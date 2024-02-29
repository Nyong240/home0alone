// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { createWriteStream } = require('fs');
// const path = require('path');
// const aws = require('./config/AWS_S3');

// const s3Client = new S3Client(aws.s3);

// async function downloadFile(key) {
//     const downloadPath = path.join(process.cwd(),'./react-project/public/videos', key);

    
//     const command = new GetObjectCommand({
//         Bucket: aws.s3.bucketName,
//         Key: key,
//     });

//        const response = await s3Client.send(command);

//     const fileStream = createWriteStream(downloadPath);
//     response.Body.pipe(fileStream);

//     return new Promise((resolve, reject) => {
//         fileStream.on('finish', resolve);
//         fileStream.on('error', reject);
//     });
// }



// // downloadFile('test3.mp4')
// //     .then(() => console.log('File downloaded successfully'))
// //     .catch(error => console.error('Error in download', error));


// module.exports = downloadFile
// downloadFile.js 파일
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { createWriteStream } = require('fs');
const path = require('path');
const aws = require('./AWS_S3');

const s3Client = new S3Client(aws.s3);

async function downloadFile(key) {
    const downloadPath = path.join(process.cwd(),'./react-project/public/videos', key);

    const command = new GetObjectCommand({
        Bucket: aws.s3.bucketName,
        Key: key,
    });

    const response = await s3Client.send(command);

    const fileStream = createWriteStream(downloadPath);
    response.Body.pipe(fileStream);

    return new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
    });
}

module.exports = downloadFile;

