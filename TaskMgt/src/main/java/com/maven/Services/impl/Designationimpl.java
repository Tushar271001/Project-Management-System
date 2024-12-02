package com.maven.Services.impl;

import com.maven.Model.Category;
import com.maven.Model.Designations;
import com.maven.Model.dtos.DesignationDto;
import com.maven.Repository.ICategoryRepository;
import com.maven.Repository.IDesignationRepository;
import com.maven.Services.IDesignationsService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class Designationimpl implements IDesignationsService {
    @Autowired
    private IDesignationRepository designationRepository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public Designations adddesignations(Designations designations) {
        designations.setDate(LocalDate.now().toString());
        return designationRepository.save(designations);
    }

    @Override
    public List<DesignationDto> getAllDesignations() {
        List<DesignationDto> designations=new ArrayList<>();
         designationRepository.findAll().forEach(designation -> {
               DesignationDto designationDto=new DesignationDto();
               designationDto.setName(designation.getName());
               designationDto.setId(designation.getId());
               designationDto.setDescription(designation.getDescription());

               Category category =categoryRepository.findById(designation.getCategory()).get();
               designationDto.setCategoryName(category.getName());
               designationDto.setDate(designation.getDate());
               designations.add(designationDto);
         });

         return designations;
    }

    @Override
    public Designations updateDesignation(Designations designations) throws ResourceNotFoundException {
        Designations existedDesignations=designationRepository.findById(designations.getId()).orElseThrow(
                ()->new ResourceNotFoundException("Designation is not present..!"));

        existedDesignations.setName(designations.getName());
        existedDesignations.setDescription(designations.getDescription());
        existedDesignations.setCategory(designations.getCategory());
        existedDesignations.setDate(designations.getDate());
        return designationRepository.save(existedDesignations);
    }

    @Override
    public String deleteDesignation(Long designationId) {

        designationRepository.deleteById(designationId);
        if(designationRepository.findById(designationId).isEmpty()){
            return "Designation deleted successfully..!";
        }
        else{
            return "Designation deletion failed..!";
        }
    }
}
