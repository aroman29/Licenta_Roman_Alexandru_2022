package ro.tuc.ds2020.Security;

import ro.tuc.ds2020.dtos.UsersDTO;

import javax.persistence.Column;
import javax.persistence.Id;

public class AuthenticationResponse {

    private final String jwt;
    private UsersDTO usersDTO;

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    public AuthenticationResponse(String jwt, UsersDTO usersDTO) {
        this.jwt = jwt;
        this.usersDTO = usersDTO;
    }

    public String getJwt() {
        return jwt;
    }

    public UsersDTO getUsersDTO() {
        return usersDTO;
    }

    public void setUsersDTO(UsersDTO usersDTO) {
        this.usersDTO = usersDTO;
    }
}
