package ro.tuc.ds2020.dtos;

import lombok.*;
import ro.tuc.ds2020.entities.Users;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MessagesDTO {

    private String id;
    private String message;
    private boolean seen;
    private LocalDateTime datetime;
    private String senderId;
    private String receiverId;
    private boolean active;

}
