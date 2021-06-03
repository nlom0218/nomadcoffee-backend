import { createWriteStream } from "fs"

export const uploadPhoto = async (file, loggedInUser) => {
  const { filename, createReadStream } = await file
  const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
  const readStream = createReadStream()
  const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
  readStream.pipe(writeStream)
  return `http://localhost:4000/static/${newFilename}`
}