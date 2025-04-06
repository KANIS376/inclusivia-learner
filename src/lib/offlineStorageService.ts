
// Offline storage service with sync capability

type StorageItem = {
  id: string;
  value: any;
  lastModified: number;
  synced: boolean;
};

class OfflineStorageService {
  private storage: Storage;
  private prefix: string = 'inclusivia_';
  
  constructor() {
    this.storage = window.localStorage;
  }
  
  // Save data to local storage
  save(key: string, value: any): void {
    try {
      const item: StorageItem = {
        id: key,
        value,
        lastModified: Date.now(),
        synced: false
      };
      
      this.storage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }
  
  // Get data from local storage
  get<T>(key: string): T | null {
    try {
      const data = this.storage.getItem(this.prefix + key);
      if (!data) return null;
      
      const item: StorageItem = JSON.parse(data);
      return item.value as T;
    } catch (error) {
      console.error('Error retrieving from local storage:', error);
      return null;
    }
  }
  
  // Delete data from local storage
  remove(key: string): void {
    try {
      this.storage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error removing from local storage:', error);
    }
  }
  
  // Get all unsynced items
  getUnsyncedItems(): StorageItem[] {
    const unsynced: StorageItem[] = [];
    
    try {
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key && key.startsWith(this.prefix)) {
          const data = this.storage.getItem(key);
          if (data) {
            const item: StorageItem = JSON.parse(data);
            if (!item.synced) {
              unsynced.push(item);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error retrieving unsynced items:', error);
    }
    
    return unsynced;
  }
  
  // Mark an item as synced
  markAsSynced(key: string): void {
    try {
      const data = this.storage.getItem(this.prefix + key);
      if (data) {
        const item: StorageItem = JSON.parse(data);
        item.synced = true;
        this.storage.setItem(this.prefix + key, JSON.stringify(item));
      }
    } catch (error) {
      console.error('Error marking item as synced:', error);
    }
  }
  
  // Clear all data
  clear(): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => this.storage.removeItem(key));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
  
  // Check if storage is available
  isAvailable(): boolean {
    try {
      const testKey = this.prefix + 'test';
      this.storage.setItem(testKey, 'test');
      this.storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Create a singleton instance
const offlineStorage = new OfflineStorageService();

export default offlineStorage;
