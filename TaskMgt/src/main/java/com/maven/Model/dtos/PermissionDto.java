package com.maven.Model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionDto {

    private Long id;
    private Boolean showPermission;
    private Boolean createPermission;
    private Boolean editPermission;
    private Boolean deletePermission;

}
