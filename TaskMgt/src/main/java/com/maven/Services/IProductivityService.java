package com.maven.Services;

import com.maven.Model.Productivity;
import com.maven.Model.dtos.ProductivityDto;
import com.maven.exception.ResourceNotFoundException;

import java.util.List;

public interface IProductivityService  {
    Productivity addProductivity(Productivity productivity);
    List<ProductivityDto> getAllProductivity();

    List<ProductivityDto> getProductivitiesByProject(Long projectId);

    List<ProductivityDto> getProductivitiesByStatus(String status);

    Productivity updateProductivity(Productivity productivity) throws ResourceNotFoundException;

    String deleteProductivity(Long productivityId);
}
