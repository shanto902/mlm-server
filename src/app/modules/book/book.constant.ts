export const bookSearchableField: {
  field: string;
  type: 'string' | 'number';
}[] = [
  { field: 'title', type: 'string' },
  { field: 'language', type: 'string' },
  { field: 'author', type: 'string' },
  { field: 'ISBN', type: 'string' },
  { field: 'publishedYear', type: 'number' },
  { field: 'categories.name', type: 'string' },
];
