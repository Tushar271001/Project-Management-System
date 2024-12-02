package com.maven.filter;

import com.maven.constants.ApplicationConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
public class JwtTokenValidator extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwtToken=getJwtFromRequest(request);


        if (jwtToken!=null){
            try {
                Environment environment = getEnvironment();

                if (environment != null) {




                    String secret = environment.getProperty(ApplicationConstant.JWT_SECRET_KEY, ApplicationConstant.JWT_SECRET_DEFAULT_VALUE);

                    SecretKey secretKey =
                            Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

                    if (secretKey != null) {



                        Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jwtToken).getPayload();

                        String email = String.valueOf(claims.get("username"));
                        String authorities = String.valueOf(claims.get("authorities"));

                        System.out.println("Validator running");
                        System.out.println(email);
                        System.out.println(authorities);

                        Authentication authentication =
                                new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
            catch (Exception e){
                System.out.println("Invalid Jwt Token!");
                throw new BadCredentialsException("Invalid Jwt Token!");
            }
        }

        filterChain.doFilter(request,response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {

        // Try to get the token from the Authorization header (Bearer token)
        String bearerToken = request.getHeader(ApplicationConstant.JWT_HEADER);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        // If not found, try to get the token from the custom header
        return request.getHeader(ApplicationConstant.JWT_HEADER);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().equals("/apiLogin");
    }

}