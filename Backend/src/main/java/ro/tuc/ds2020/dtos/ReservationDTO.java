package ro.tuc.ds2020.dtos;

import lombok.*;
import ro.tuc.ds2020.entities.Combustible;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private String id;
    private String serviceId;
    private String userId;
    private LocalDate date;

}
