package ro.tuc.ds2020.dtos;

import lombok.*;
import ro.tuc.ds2020.entities.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarsDTO {

    private String id;
    private String mark;
    private String serviceId;
    private String userId;
    private String model;
    private String generation;
    private String fabricationDate;
    private Combustible combustible;
    private CarStatuses status;
    private int totalPrice;

}
