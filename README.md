# Video Upload Example

Try it(in preparation).

## Motivation

I want to record and upload a video like Instagram.  
This example shows how you can record a video and upload it to S3.  
This also include how to use API Expo and AWS SDK provide.


## How to use

### Setting up the S3

- Follow the steps.
  - Create bucket.
  - Create IAM user who can read/write to the bucket.
  - In `/constants/aws.js`, fill in credentials of the IAM and upload destination.

### Running the app

- Run `yarn global add exp` if you have not installed yet.
- `cd` into the cloned directory and run `yarn`.
- Run `exp start`.

NOTE:  
If your project on other networks, run `exp start --host tunnnel`.

### Limitation

When you start to record, camera shows black screen sometimes.  
See https://github.com/expo/expo/issues/1057/.

## How this example works

I will introduce how to record and upload.

![structure](https://github.com/horiuchie/VideoUploader/blob/master/RecodingandUploading.png)

### Recording
Expo provides Camera component that has [recordAsync API](https://docs.expo.io/versions/latest/sdk/camera.html#recordasync).  
When you stop recoding, it returns `uri` which is a URI to the local video file.

### Uploading
S3 allows you to upload using POST with [AWS Signature Version 4](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html).  
The simplest way to do it is to use [createPresignedPost API](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createPresignedPost-property) AWS SDK provides.  
It returns the following `fields` to include in the form.  
- `key`, `acl`, `X-Amz-Credential`, `X-Amz-Algorithm`, `X-Amz-Date` `datetime`, `Policy`, `X-Amz-Signature`, `success_action_status`, `Content-Type`

Finally, put `uri` and `fields` into [FormData](https://developer.mozilla.org/ja/docs/Web/API/FormData), and post it to `https://s3-{$YOUR_REGION}.amazonaws.com/${YOUR_BUCKET_NAME}`. 

``` JS
/*
  FormData {
    key,
    acl,
    ...,
    file: { uri }  // "file" means <input type="file" name="file" />
  }
*/
const formData = new FormData();
R.forEachObjIndexed((value, key) => formData.append(key, value), fields);
formData.append('file', { uri });

const options = {
  method: 'POST',
  body: formData,
  headers: { 'Content-Type': 'multipart/form-data' }
};
fetch(`https://s3-{$YOUR_REGION}.amazonaws.com/${YOUR_BUCKET_NAME}`, options);
```

NOTE:  
If you want to upload an audio, see https://github.com/expo/expo/issues/214.


## Auther

horiuchie

