---
title: "Unzipping a file in S3 with AWS Lambda, and writing it all back to S3"
date: 2021-02-12
draft: true
---

**This is all about how to take a zip file in S3, unzip it as a stream, and then write it back to a s3 bucket, or where ever...**

Firstly, I followed this medium post by John Paul Hayes. [How to extract a HUGE zip file in an Amazon S3 bucket by using AWS Lambda and Python](https://medium.com/@johnpaulhayes/how-extract-a-huge-zip-file-in-an-amazon-s3-bucket-by-using-aws-lambda-and-python-e32c6cf58f06). Thanks to him. ☜(ﾟヮﾟ☜)

I am in no doubt about the fact I will have this problem again, and John's solutions was great and I didn't really anythiing. 

I'm mostly just putting this here, where I won't need to panic search for it next time I'm in a jam. 

With my use case, I needed to script an AWS CLI worker to invoke the Lambda Function. It's written around that style of use. 

Obviously, you could trigger it with all sorts of events.  

**This is the payload.**

```
{
  "src": "zip-test-source",
  "dst": "zip-test-dest",
  "zip":"A Biggly Zip File.zip"
}
```

**This is the Lambda, with all the gory imports.**
```
import logging
import os
from http import HTTPStatus
import boto3
import io
import traceback
import zipfile

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    try:        
        logger.info('Event: %s', event)       
        
        s3_resource = boto3.resource('s3')
        zip_object = s3_resource.Object(bucket_name=event['src'], key=event['zip'])
        buffer = io.BytesIO(zip_object.get()["Body"].read())
        
        z = zipfile.ZipFile(buffer)
        for filename in z.namelist():
            file_info = z.getinfo(filename)
            s3_resource.meta.client.upload_fileobj(
                z.open(filename),
                Bucket=event['dst'],
                Key=f'{filename}'
            )

    except Exception as e:
        logger.error(e)
        traceback.print_exc()
        raise Exception('Error during unpackziptoS3')
    
    return {
        "statusCode": HTTPStatus.OK.value        
    }
```

**To run this:**
1. Create a Python 3.8 Lambda
2. Give it about ~500MB of memory
3. Increase the timeout to about ~5 mins. (Good for about 5 gig)
4. Do any other lambda stuff you want, like creating a IAM role for the Lambda function that has explicit read and write to the buckets etc.

**Invoke it with the AWS CLI**
```
aws lambda invoke --function-name s3zipstream --log-type None --payload {base64 your payload} out.txt --cli-read-timeout 360
```

Pass the cli-read-timeout command if you're synchronously waiting for the file to unpack.

[LinuxHint - base64](https://linuxhint.com/bash_base64_encode_decode/)

I'm throwing an error rather than trying to recover, that's to avoid burying fault recovery logic inside something that should just be pass or fail.

It's like there' a GAP in the serverless open source library market for all this glue like functions.

**What about Golang?**

So, same payload, slightly different logic.

