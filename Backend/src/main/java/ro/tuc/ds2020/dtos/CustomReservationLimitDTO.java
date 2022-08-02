package ro.tuc.ds2020.dtos;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomReservationLimitDTO {

    private String id;
    private String serviceId;
    private int reservationLimit;
    private Date date;
    private boolean active;

}
