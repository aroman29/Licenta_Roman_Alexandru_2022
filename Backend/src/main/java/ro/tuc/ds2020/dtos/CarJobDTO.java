package ro.tuc.ds2020.dtos;

import lombok.*;
import ro.tuc.ds2020.entities.Cars;

import javax.persistence.*;

@Data
@AllArgsConstructor
public class CarJobDTO {

    private String id;
    private String name;
    private String description;
    private int price;
    private String carId;
    private String duration;
}
