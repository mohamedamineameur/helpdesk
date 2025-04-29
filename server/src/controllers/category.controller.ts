import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/category.model';

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function getCategories(req: Request, res: Response) {
  const categories = await Category.findAll();
  res.json(categories);
}

export async function getCategoryById(req: Request, res: Response) {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name ?? category.name;
    category.description = description ?? category.description;

    await category.save();
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  await category.destroy();
  res.json({ message: 'Category deleted' });
}
