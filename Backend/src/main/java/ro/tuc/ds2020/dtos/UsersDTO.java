package ro.tuc.ds2020.dtos;

import ro.tuc.ds2020.entities.Users;

import java.time.LocalDate;
import java.util.Objects;

public class UsersDTO {

    private String id;
    private String lastName;
    private String firstName;
    private String email;
    private boolean active;
    private String password;
    private String phone;
    private String role;
    private String serviceId;

    public UsersDTO() {
    }

    public UsersDTO(String id, String lastName, String firstName, String email, String password, String phone, String role, boolean active, String serviceId) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.active = active;
        this.serviceId = serviceId;
    }

    public UsersDTO(String id, String lastName, String firstName, String email, String password, String phone, String role, boolean active) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.active = active;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersDTO usersDTO = (UsersDTO) o;
        return email == usersDTO.email &&
                Objects.equals(lastName, usersDTO.lastName);
    }
}
