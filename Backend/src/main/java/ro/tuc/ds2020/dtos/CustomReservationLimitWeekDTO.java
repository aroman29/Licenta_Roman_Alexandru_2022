package ro.tuc.ds2020.dtos;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomReservationLimitWeekDTO {

    private String id;
    private String serviceId;
    private int reservationLimit;
    private List<Date> days;
}
