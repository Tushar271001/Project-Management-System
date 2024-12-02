package com.maven.Model.dtos;

public record LoginResponseDto(String username,String httpStatus,String role,String jwtToken) {
}
