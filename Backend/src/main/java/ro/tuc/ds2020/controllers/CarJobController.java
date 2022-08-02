package ro.tuc.ds2020.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.CarJobDTO;
import ro.tuc.ds2020.services.CarJobService;


import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping()
public class CarJobController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarJobController.class);
    private CarJobService carJobService;

    @Autowired
    public CarJobController(CarJobService carJobService){
        this.carJobService = carJobService;
    }

    @RequestMapping(value = "/carJobs/get", method = RequestMethod.GET)
    public ResponseEntity<List<CarJobDTO>> getCarJobs() {
        List<CarJobDTO> dtos = carJobService.findAllCarJobs();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/carJob/insert", method = RequestMethod.POST)
    public ResponseEntity<?> insertCarJob(@RequestBody CarJobDTO carJobDTO) throws Exception {
        carJobDTO.setId(UUID.randomUUID().toString());
        String returnedId = carJobService.insert(carJobDTO);
        CarJobDTO dto = carJobService.findBarJobById(returnedId);
        return ResponseEntity.ok(dto);
    }

    @RequestMapping(value = "/carJob/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteCarJob(@RequestBody CarJobDTO carJobDTO) throws Exception {

        String returnedId = carJobService.delete(carJobDTO);
        return ResponseEntity.ok(returnedId);
    }
}
