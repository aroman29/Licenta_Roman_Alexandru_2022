package ro.tuc.ds2020.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    private String id;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "email", unique=true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "role", nullable = false)
    private String role;

    @OneToMany(mappedBy = "userOwner")
    private List<Cars> cars;

    @OneToMany(mappedBy = "sender")
    private List<Messages> senderMessages;

    @OneToMany(mappedBy = "receiver")
    private List<Messages> receiverMessages;

    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="serviceAssigned")
    private Services serviceAssigned;


    public Users(String id, String firstName, String lastName,String email, String password, boolean active, String phone, String role) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.role = role;
        this.password = password;
        this.phone = phone;
        this.id = id;
        this.active = active;
    }

    public Users(String firstName, String lastName,String email, String password, boolean active, String phone, String role) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.role = role;
        this.password = password;
        this.phone = phone;
        this.id = UUID.randomUUID().toString();
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public String getRole() {
        return role;
    }

    public void setRole(String type) {
        this.role = role;
    }

    public List<Cars> getCars() {
        return cars;
    }

    public void setCars(List<Cars> cars) {
        this.cars = cars;
    }

    public List<Messages> getSenderMessages() {
        return senderMessages;
    }

    public void setSenderMessages(List<Messages> senderMessages) {
        this.senderMessages = senderMessages;
    }

    public List<Messages> getReceiverMessages() {
        return receiverMessages;
    }

    public void setReceiverMessages(List<Messages> receiverMessages) {
        this.receiverMessages = receiverMessages;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", active=" + active +
                ", phone='" + phone + '\'' +
                ", role='" + role + '\'' +
                ", cars=" + cars +
                ", senderMessages=" + senderMessages +
                ", receiverMessages=" + receiverMessages +
                ", serviceAssigned=" + serviceAssigned +
                '}';
    }
}
