package ro.tuc.ds2020.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.CustomReservationLimitDTO;
import ro.tuc.ds2020.dtos.ReservationLimitDTO;
import ro.tuc.ds2020.dtos.ServicesDTO;
import ro.tuc.ds2020.entities.Services;
import ro.tuc.ds2020.services.ServicesService;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping()
public class ServicesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ServicesController.class);
    private ServicesService servicesService;

    @Autowired
    public ServicesController(ServicesService servicesServic){
        this.servicesService = servicesServic;
    }

    @RequestMapping(value = "/services", method = RequestMethod.GET)
//    @GetMapping()
    public ResponseEntity<?> getServices() {
        System.out.println("get services");
        List<ServicesDTO> dtos = servicesService.findServices();
        try{
            return ResponseEntity.ok(dtos);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Locations error miau");
        }
    }

    @RequestMapping(value = "/insertService", method = RequestMethod.POST)
    public ResponseEntity<?> insertService(@RequestBody ServicesDTO servicesDTO) throws Exception {
        servicesDTO.setId(UUID.randomUUID().toString());
        String serviceId = servicesService.insert(servicesDTO);
        ServicesDTO dto = servicesService.findServicesById(serviceId);

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/service/delete/{id}")
    public ResponseEntity<?> deleteService(@PathVariable String id){
        try{
            servicesService.deleteService(id);
            return ResponseEntity.ok(id);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is no such service!");
        }
    }


    @PutMapping("/service/edit/{id}")
    public ResponseEntity<?> editService(@PathVariable String id, @RequestBody ServicesDTO servicesDTO){
        System.out.println("editing service");

            servicesService.updateService(servicesDTO, id);
            return ResponseEntity.ok(id);

    }

    @PostMapping("service/edit/reservation/limit")
    public ResponseEntity<?> ChangeReservationLimit(@PathVariable String serviceId, @RequestBody ReservationLimitDTO reservationLimitDTO){
        ServicesDTO servicesDTO = null;
//        try{
            servicesDTO = servicesService.updateReservationLimit(reservationLimitDTO, serviceId.toString());
            return ResponseEntity.ok(serviceId);
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in editing service with id: " + servicesDTO.getId() + "!");
//        }
    }
    @RequestMapping(value = "/reservationLimit/get/{serviceId}", method = RequestMethod.POST)
    public ResponseEntity<?> getReservationLimitByServiceId(@PathVariable String serviceId, @RequestBody String date) {
        System.out.println(serviceId + " " + date);
        int limit = servicesService.findReservationLimitByServiceIdAndDate(serviceId, date);
        try{
            return ResponseEntity.ok(limit);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting reservation limit by service id and date");
        }
    }

    @RequestMapping(value = "/reservationLimits/get/{serviceId}", method = RequestMethod.GET)
    public ResponseEntity<?> getReservationLimitsByServiceId(@PathVariable String serviceId) {
        List<CustomReservationLimitDTO> dtos = servicesService.findReservationLimitsByServiceId(serviceId);
        try{
            return ResponseEntity.ok(dtos);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting reservation limit values");
        }
    }




}
