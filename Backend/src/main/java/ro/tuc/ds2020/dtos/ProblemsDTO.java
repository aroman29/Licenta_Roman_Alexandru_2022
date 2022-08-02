package ro.tuc.ds2020.dtos;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProblemsDTO {

    private LocalDate date;
    private boolean option0;
    private boolean option1;
    private boolean option2;
    private boolean option3;
    private boolean option4;
    private boolean option5;
    private String notes;
    private String carId;
}
