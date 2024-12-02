package com.maven.Services;

import com.maven.Model.UserPermission;
import com.maven.Model.dtos.PermissionDto;
import com.maven.exception.ResourceNotFoundException;

import java.util.List;

public interface IPermissionService {
    UserPermission setPermissions(UserPermission permission);
    List<UserPermission> getAllPermissionsByGroupId(Long id);
    UserPermission updatePermissionsByPermissionId(PermissionDto permissionDto) throws ResourceNotFoundException;
}
