/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Class } from 'type-fest';
import { getManager } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IRepository<Entity> {
  find(criteria: Partial<Entity>): Promise<Entity[]>;

  save(newEntity: Partial<Entity>): Promise<Entity>;

  findOne(criteria: Partial<Entity>): Promise<Entity | undefined>;

  delete(criteria: Partial<Entity>): Promise<Entity | undefined>;

  update(criteria: Partial<Entity>, partialEntity: Partial<Entity>): Promise<Entity>;
}

export default function PrimaryRepository<Entity>(entity: Class<Entity>): Class<IRepository<Entity>> {
  @Injectable()
  class Repository implements IRepository<Entity> {
    async find(criteria: Partial<Entity>, em = getManager()): Promise<Entity[]> {
      return em.find(entity, criteria);
    }

    async findOne(criteria: Partial<Entity>, em = getManager()): Promise<Entity | undefined> {
      return em.findOne(entity, criteria);
    }

    async delete(criteria: Partial<Entity>, em = getManager()): Promise<Entity | undefined> {
      const entityToDelete = await this.findOne(criteria, em);

      await em.delete(entity, criteria);

      return entityToDelete;
    }

    async update(criteria: Partial<Entity>, partialEntity: Partial<Entity>, em = getManager()): Promise<Entity> {
      await em.update(entity, criteria, partialEntity as QueryDeepPartialEntity<Entity>);

      const updatedEntity = await this.findOne(criteria, em);

      if (!updatedEntity) {
        throw new BadRequestException('Not found');
      }

      return updatedEntity;
    }

    async save(newEntity: Partial<Entity>, em = getManager()): Promise<Entity> {
      try {
        return em.save(newEntity as Entity);
      } catch (err) {
        throw err;
      }
    }
  }

  return Repository;
}
