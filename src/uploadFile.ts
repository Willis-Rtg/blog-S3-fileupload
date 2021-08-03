import { Resolvers } from "./type";
import { S3 } from "aws-sdk";

const s3 = new S3();
s3.config.update({
  credentials: {
    accessKeyId: process.env.AWS_SECRET_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const uploadFile: Resolvers = {
  Mutation: {
    createFile: async (_, { file }) => {
      if (!file) return false;
      const { filename, createReadStream } = await file;
      const readStream = createReadStream();
      const saveFilename = `${Date.now()}-${filename}`;
      const save = await s3
        .upload({
          Bucket: "apollofileupload",
          Key: saveFilename,
          Body: readStream,
          ACL: "public-read",
        })
        .promise();
      console.log(
        "🚀 ~ file: uploadFile.ts ~ line 34 ~ createFile: ~ save",
        save
      );
      return true;
    },
  },
};

export default uploadFile;
