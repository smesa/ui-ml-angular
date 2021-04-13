import { visionCategoryModel } from "./category.model";

export interface projectModel {
  id?: string,
  name: string,
  description: string,
  type: string,
  createdAt?: any,
  updatedAt?: any,
  visionCategoryModel?: visionCategoryModel[]
}
