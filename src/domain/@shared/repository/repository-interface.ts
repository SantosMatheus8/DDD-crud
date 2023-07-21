export default interface RepositoryInterface<T> {
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
}
