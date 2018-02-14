import Promise from 'bluebird';
import * as _AWS from 'aws-sdk';
_AWS.config.setPromisesDependency(Promise);
_AWS.config.update({ 
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SERCRET_ACCESS_KEY',
  region: 'YOUR_REGION'
});
export const AWS = _AWS;
export const BUCKET = 'YOUR_BUCKET_NAME';
export const UPLOAD_ACTION = `https://s3-ap-northeast-1.amazonaws.com/${BUCKET}`;
export const UPLOAD_DIR = 'videos';
