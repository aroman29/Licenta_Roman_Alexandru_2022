package ro.tuc.ds2020.dtos;

import lombok.*;
import ro.tuc.ds2020.entities.CarStatuses;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarStatusDTO {

    private String carId;
    private CarStatuses status;
}
