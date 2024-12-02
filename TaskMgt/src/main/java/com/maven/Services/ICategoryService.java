package com.maven.Services;


import com.maven.Model.Category;
import com.maven.exception.ResourceNotFoundException;

import java.util.List;

public interface ICategoryService {

    Category addCategory(Category category);

    List<Category> getAllCategories();

    void deleteCategory(Long categoryId);

    Category updateCategory(Category category) throws ResourceNotFoundException;
}
