package ro.tuc.ds2020.dtos;
import lombok.*;
import ro.tuc.ds2020.entities.Cars;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServicesDTO {

    private String id;
    private String address;
    private String city;
    private boolean open;
    private String lat;
    private String lng;
    private int reservationLimit;
}
