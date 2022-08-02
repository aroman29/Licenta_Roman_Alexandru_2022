package ro.tuc.ds2020.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.CustomReservationLimitDTO;
import ro.tuc.ds2020.dtos.CustomReservationLimitWeekDTO;
import ro.tuc.ds2020.dtos.ReservationDTO;
import ro.tuc.ds2020.dtos.ReservationInsertDTO;
import ro.tuc.ds2020.services.CustomReservationLimitService;
import ro.tuc.ds2020.services.ReservationService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping()
public class CustomReservationLimitController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomReservationLimitController.class);
    private CustomReservationLimitService customReservationLimitService;

    @Autowired
    public CustomReservationLimitController(CustomReservationLimitService customReservationLimitService){
        this.customReservationLimitService = customReservationLimitService;
    }

    @RequestMapping(value = "/customReservationLimits/get", method = RequestMethod.GET)
    public ResponseEntity<?> getCustomReservationLimits() {
        System.out.println("get custom reservations limits");

        List<CustomReservationLimitDTO> dtos = customReservationLimitService.findCustomReservationLimits();
        System.out.println(dtos.toString());
        return ResponseEntity.ok(dtos);
    }

    @RequestMapping(value = "/customReservationLimit/add", method = RequestMethod.POST)
    public ResponseEntity<?> addCustomReservationLimit(@RequestBody CustomReservationLimitDTO customReservationLimitDTO) throws Exception {
        System.out.println("insert custom reservation limit");
        String id = customReservationLimitService.insert(customReservationLimitDTO);
        return ResponseEntity.ok("Custom reservation limit with id:" + id + " inserted");
    }

    @RequestMapping(value = "/customReservationLimits/add", method = RequestMethod.POST)
    public ResponseEntity<?> addCustomReservationLimits(@RequestBody CustomReservationLimitWeekDTO customReservationLimitWeekDTO) throws Exception {
        System.out.println("insert custom reservation limit");
        String id = customReservationLimitService.insert(customReservationLimitWeekDTO);
        return ResponseEntity.ok("Custom reservation limits were inserted");
    }

}
