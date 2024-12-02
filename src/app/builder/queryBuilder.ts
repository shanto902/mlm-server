import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: { field: string; type: 'string' | 'number' }[]) {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      const orConditions: FilterQuery<T>[] = [];

      searchableFields.forEach(({ field, type }) => {
        if (type === 'string') {
          if (field.includes('.')) {
            // Handle populated nested fields
            const fieldParts = field.split('.');
            const fieldName = fieldParts[0];
            const nestedField = fieldParts.slice(1).join('.');

            // Dynamically match any nested fields
            orConditions.push({
              [`${fieldName}.${nestedField}`]: {
                $regex: searchTerm,
                $options: 'i',
              },
            } as FilterQuery<T>);
          } else {
            // Regular string fields
            orConditions.push({
              [field]: {
                $regex: searchTerm,
                $options: 'i',
              },
            } as FilterQuery<T>);
          }
        } else if (type === 'number' && !isNaN(Number(searchTerm))) {
          // Number fields
          orConditions.push({
            [field]: Number(searchTerm),
          } as FilterQuery<T>);
        }
      });

      if (orConditions.length > 0) {
        this.modelQuery = this.modelQuery.find({
          $or: orConditions,
        } as FilterQuery<T>);
      }
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
