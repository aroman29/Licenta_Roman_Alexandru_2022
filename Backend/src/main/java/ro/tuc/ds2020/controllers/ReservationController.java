package ro.tuc.ds2020.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.CarsDTO;
import ro.tuc.ds2020.dtos.CarsInsertDTO;
import ro.tuc.ds2020.dtos.ReservationDTO;
import ro.tuc.ds2020.dtos.ReservationInsertDTO;
import ro.tuc.ds2020.entities.Reservation;
import ro.tuc.ds2020.services.CarsService;
import ro.tuc.ds2020.services.ReservationService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping()
public class ReservationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReservationController.class);
    private ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @RequestMapping(value = "/reservations/get", method = RequestMethod.GET)
    public ResponseEntity<?> getCars() {
        System.out.println("get reservations");

        List<ReservationDTO> dtos = reservationService.findAllReservations();
        System.out.println(dtos.toString());
        return ResponseEntity.ok(dtos);
    }

    @RequestMapping(value = "/reservation/add", method = RequestMethod.POST)
    public ResponseEntity<?> makeReservation(@RequestBody ReservationInsertDTO reservationInsertDTO) throws Exception {
        System.out.println("insert car");
        String id = reservationService.insert(reservationInsertDTO);
        return ResponseEntity.ok("service with id:" + id + " inserted");
    }
}
