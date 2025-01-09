import { model, Schema } from 'mongoose';
import { TLibraryVan } from './libraryVan.interface';

// Schema definition
const libraryVanSchema = new Schema<TLibraryVan>(
  {
    libraryVanId: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
      required: false,
    },
    locationUpdatedAt: {
      type: Date,
      default: null, // Default to null, to indicate location hasn't been updated yet
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'in-maintenance'],
      default: 'active', // Default status is 'active'
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt
);

// Create model
const LibraryVanModel = model<TLibraryVan>('LibraryVan', libraryVanSchema);

export { LibraryVanModel };
