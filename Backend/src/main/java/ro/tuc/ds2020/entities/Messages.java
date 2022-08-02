package ro.tuc.ds2020.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Messages {

    @Id
    private String id;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "seen", nullable = false)
    private boolean seen;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="sender")
    private Users sender;

    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="receiver")
    private Users receiver;

    @Column(name = "active", nullable = false)
    private boolean active;
}
