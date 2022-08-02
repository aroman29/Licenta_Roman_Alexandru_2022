package ro.tuc.ds2020.dtos;

import lombok.*;
import ro.tuc.ds2020.entities.CarStatuses;
import ro.tuc.ds2020.entities.Combustible;
import ro.tuc.ds2020.entities.Services;
import ro.tuc.ds2020.entities.Users;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationInsertDTO {

    private String id;
    private String mark;
    private String model;
    private String generation;
    private String fabricationDate;
    private Combustible combustible;
    private String serviceId;
    private String userId;
    private LocalDate date;
    private boolean option0;
    private boolean option1;
    private boolean option2;
    private boolean option3;
    private boolean option4;
    private boolean option5;
    private String notes;


    @Override
    public String toString() {
        return "ReservationInsertDTO{" +
                "id='" + id + '\'' +
                ", mark='" + mark + '\'' +
                ", model='" + model + '\'' +
                ", generation='" + generation + '\'' +
                ", fabricationDate='" + fabricationDate + '\'' +
                ", combustible=" + combustible +
                ", serviceId='" + serviceId + '\'' +
                ", userId='" + userId + '\'' +
                ", date=" + date +
                ", option0='" + option0 + '\'' +
                ", option1='" + option1 + '\'' +
                ", option2='" + option2 + '\'' +
                ", option3='" + option3 + '\'' +
                ", option4='" + option4 + '\'' +
                ", option5='" + option5 + '\'' +
                '}';
    }
}
