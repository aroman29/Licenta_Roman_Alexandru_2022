package ro.tuc.ds2020.Security;

import javax.persistence.Column;
import javax.persistence.Id;

public class RegisterRequest {

    private String lastName;
    private String firstName;
    private String email;
    private String password;
    private boolean active;
    private String phoneNumber;
    private String role;
    private String serviceId;

    public RegisterRequest(String lastName, String firstName, String email, String password, boolean active, String phoneNumber, String role, String serviceId) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.active = active;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.serviceId = serviceId;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }
}
