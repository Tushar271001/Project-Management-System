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
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String taskName;
    private Long project;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String description;
    private LocalDate date;

    @ManyToMany
    @JoinTable(
            name = "task_team_members",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "teammember_id"))
    private Set<TeamMember> teamMembers = new HashSet<>();
}
