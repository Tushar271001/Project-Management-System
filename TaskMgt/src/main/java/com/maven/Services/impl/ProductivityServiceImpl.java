package com.maven.Services.impl;

import com.maven.Model.Productivity;
import com.maven.Model.Projects;
import com.maven.Model.dtos.ProductivityDto;
import com.maven.Model.dtos.TaskDto;
import com.maven.Repository.IProductivityRepository;
import com.maven.Repository.IProjectRepository;
import com.maven.Services.IProductivityService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductivityServiceImpl implements IProductivityService {
    @Autowired
    private IProductivityRepository productivityRepository;

    @Autowired
    private IProjectRepository projectRepository;

    @Override
    public Productivity addProductivity(Productivity productivity) {
        return productivityRepository.save(productivity);
    }

    @Override
    public List<ProductivityDto> getAllProductivity() {

        List<ProductivityDto> productivities = new ArrayList<>();
        productivityRepository.findAll().forEach(productivity -> {
            ProductivityDto productivityDto = new ProductivityDto();

            productivityDto.setId(productivity.getId());
            productivityDto.setProductivityName(productivity.getProductivityName());

            Projects projects =projectRepository.findById(productivity.getProject()).get();
            productivityDto.setProjectName(projects.getProjectName());
            productivityDto.setStatus(productivity.getStatus());

            productivityDto.setStartDate(productivity.getStartDate().toString());
            productivityDto.setEndDate(productivity.getEndDate().toString());
            long duration = Duration.between(productivity.getStartDate().atStartOfDay(), productivity.getEndDate().atStartOfDay()).toDays();
            productivityDto.setDuration(duration);

            productivities.add(productivityDto);
        });
        return productivities;
    }

    @Override
    public List<ProductivityDto> getProductivitiesByProject(Long projectId) {
        List<ProductivityDto> productivities = new ArrayList<>();
        productivityRepository.findProductivitiesByProject(projectId).forEach(productivity -> {
            ProductivityDto productivityDto = new ProductivityDto();

            productivityDto.setId(productivity.getId());
            productivityDto.setProductivityName(productivity.getProductivityName());

            Projects projects =projectRepository.findById(productivity.getProject()).get();
            productivityDto.setProjectName(projects.getProjectName());
            productivityDto.setStatus(productivity.getStatus());


            productivityDto.setStartDate(productivity.getStartDate().toString());
            productivityDto.setEndDate(productivity.getEndDate().toString());
            long duration = Duration.between(productivity.getStartDate().atStartOfDay(), productivity.getEndDate().atStartOfDay()).toDays();
            productivityDto.setDuration(duration);

            productivities.add(productivityDto);
        });
        return productivities;
    }

    @Override
    public List<ProductivityDto> getProductivitiesByStatus(String status) {
        List<ProductivityDto> productivities = new ArrayList<>();
        productivityRepository.findByStatus(status.toLowerCase()).forEach(productivity -> {
            ProductivityDto productivityDto = new ProductivityDto();

            productivityDto.setId(productivity.getId());
            productivityDto.setProductivityName(productivity.getProductivityName());

            Projects projects =projectRepository.findById(productivity.getProject()).get();
            productivityDto.setProjectName(projects.getProjectName());
            productivityDto.setStatus(productivity.getStatus());


            productivityDto.setStartDate(productivity.getStartDate().toString());
            productivityDto.setEndDate(productivity.getEndDate().toString());
            long duration = Duration.between(productivity.getStartDate().atStartOfDay(), productivity.getEndDate().atStartOfDay()).toDays();
            productivityDto.setDuration(duration);

            productivities.add(productivityDto);
        });
        return productivities;
    }

    @Override
    public Productivity updateProductivity(Productivity productivity) throws ResourceNotFoundException {
        Productivity existedProductivity=productivityRepository.findById(productivity.getId()).orElseThrow(
                ()->new ResourceNotFoundException("Productivity is not present"));

        existedProductivity.setProductivityName(productivity.getProductivityName());
        existedProductivity.setDescription(existedProductivity.getDescription());
        existedProductivity.setStatus(productivity.getStatus());
        existedProductivity.setProject(productivity.getProject());
        existedProductivity.setStartDate(productivity.getStartDate());
        existedProductivity.setStartDate(productivity.getStartDate());
        existedProductivity.setEndDate(productivity.getEndDate());
        return productivityRepository.save(existedProductivity);
    }

    @Override
    public String deleteProductivity(Long productivityId) {
        productivityRepository.deleteById(productivityId);

        if(productivityRepository.findById(productivityId).isEmpty()){
            return "Productivity deleted";
        }
        else{
            return "Productivity not deleted";
        }
    }
}
