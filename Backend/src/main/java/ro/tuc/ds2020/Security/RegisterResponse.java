package ro.tuc.ds2020.Security;

import ro.tuc.ds2020.dtos.UsersDTO;

public class RegisterResponse {

    private String lastName;
    private String firstName;
    private String email;
    private String password;
    private boolean active;
    private String phone;
    private String type;

    public RegisterResponse(UsersDTO usersDTO) {
        this.lastName = usersDTO.getLastName();
        this.firstName = usersDTO.getFirstName();
        this.email = usersDTO.getEmail();
        this.password = usersDTO.getPassword();
        this.active = usersDTO.isActive();
        this.phone = usersDTO.getPhone();
        this.type = usersDTO.getRole();
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
