package com.maven.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "permission")
public class UserPermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Boolean showPermission;
    private Boolean createPermission;
    private Boolean editPermission;
    private Boolean deletePermission;
    @ManyToOne
    @JsonIgnore
    private AdminGroups adminGroups;
    private String modules;
}
