import fs from "fs";
import { Resolvers } from "./type";

const uploadFile: Resolvers = {
  Mutation: {
    createFile: async (_, { file }) => {
      if (!file) return false;
      const { filename, createReadStream } = await file;
      const readStream = createReadStream();
      const writeStrem = fs.createWriteStream(
        `${process.cwd()}/uploads/${filename}` //파일저장 경로
      );
      readStream.pipe(writeStrem);
      return true;
    },
  },
};

export default uploadFile;
