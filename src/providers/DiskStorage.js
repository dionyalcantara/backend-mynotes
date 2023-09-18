const fs = require('fs/promises');
const path =  require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage {
  async saveFile(file) {
    await fs.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.unlink(filePath);
  }
}

module.exports = DiskStorage;