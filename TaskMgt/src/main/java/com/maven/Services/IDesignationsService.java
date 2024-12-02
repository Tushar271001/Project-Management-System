package com.maven.Services;

import com.maven.Model.Designations;
import com.maven.Model.dtos.DesignationDto;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IDesignationsService {
    Designations adddesignations(Designations designations);
    List<DesignationDto> getAllDesignations();

    Designations updateDesignation(Designations designations) throws ResourceNotFoundException;

    String deleteDesignation(Long designationId);
}
