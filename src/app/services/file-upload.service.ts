import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject
} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(private storage: Storage) { }

  private buildFilePath(customName: string, folderPath: string): string {
    return `${folderPath}/${customName}`;
  }

  private async deleteIfExists(fileRef: any): Promise<void> {
    try {
      await deleteObject(fileRef);
    } catch (error: any) {
      // Ignore if file doesn't exist
      if (error.code !== 'storage/object-not-found') {
        throw error;
      }
    }
  }

  // Assume you have the download URL and storage instance
  public async deleteFileByDownloadUrl(downloadUrl: string): Promise<void> {
    try {
      // Create a reference from the download URL
      const fileRef = ref(this.storage, downloadUrl);

      // Delete the file
      await deleteObject(fileRef);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async uploadOrReplaceFile(customFileName: string, file: File, folderPath: string): Promise<string> {
    const filePath = this.buildFilePath(customFileName, folderPath);
    const fileRef = ref(this.storage, filePath);

    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => { },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  async getFileUrlByFileName(customFileName: string, folderPath: string): Promise<string | null> {
    try {
      const filePath = this.buildFilePath(customFileName, folderPath);
      const fileRef = ref(this.storage, filePath);
      return await getDownloadURL(fileRef);
    } catch (error: any) {
      if (error.code === 'storage/object-not-found') return null;
      throw error;
    }
  }
  async listAllFiles(folderPath: string): Promise<string[]> {
    const folderRef = ref(this.storage, folderPath);
    const result = await listAll(folderRef);

    const downloadURLs = await Promise.all(
      result.items.map(item => getDownloadURL(item))
    );

    return downloadURLs;
  }
}
