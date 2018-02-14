import * as R from 'ramda';
const path = require('path');
import { AWS, UPLOAD_ACTION, UPLOAD_DIR, BUCKET } from '../constants/aws';

//
export const upload = ({ uri }) => {
  const s3 = new AWS.S3();
  const basename = path.basename(uri);
  const key = `${UPLOAD_DIR}/${basename}`;
  //
  const params = {
    Bucket: BUCKET,
    Fields: {
      key,
      acl: 'public-read',
      // 'Content-Type': 'video/quicktime',
    }
  };
  const fields = s3.createPresignedPost(params).fields;
  //
  const formData = new FormData();
  R.forEachObjIndexed((value, key) => formData.append(key, value), fields);
  formData.append('file', { uri });
  //
  // https://github.com/expo/expo/issues/920
  // https://github.com/expo/image-upload-example/blob/master/frontend/App.js#L160-L192
  const options = {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  return fetch(UPLOAD_ACTION, options).catch(err => alert(JSON.stringify(err)));
};

//
export const fetchVideos = async () => {
  const s3 = new AWS.S3();
  const params = { Bucket: BUCKET, Prefix: UPLOAD_DIR };
  const videos = await s3.listObjectsV2(params).promise()
    .then(R.prop('Contents'))
    .then(R.pluck('Key'))
    .then(R.map(path.basename))
    .then(R.reject(R.equals(UPLOAD_DIR)));
  return videos;
};
