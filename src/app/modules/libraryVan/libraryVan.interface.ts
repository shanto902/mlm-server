export type TLibraryVan = {
  libraryVanId: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  locationUpdatedAt?: string;
  status: 'active' | 'inactive' | 'in maintenance';
  createdAt?: Date;
  updatedAt?: Date;
};
