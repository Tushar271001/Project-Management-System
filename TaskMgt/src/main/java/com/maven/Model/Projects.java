package com.maven.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String projectName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String projectManager;
    private  Long category;
//    private String teamMembers;
    @ManyToMany
    @JoinTable(
            name = "project_team_members",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "teammember_id"))
    private Set<TeamMember> teamMembers = new HashSet<>();
    private String status;
    private String description;
    private String date;
}
