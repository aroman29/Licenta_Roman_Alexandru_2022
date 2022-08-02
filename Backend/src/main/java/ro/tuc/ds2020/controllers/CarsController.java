package ro.tuc.ds2020.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.*;
import ro.tuc.ds2020.services.CarsService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping()
public class CarsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ServicesController.class);
    private CarsService carsService;

    @Autowired
    public CarsController(CarsService carsService){
        this.carsService = carsService;
    }

    @RequestMapping(value = "/cars/get", method = RequestMethod.GET)
    public ResponseEntity<?> getCars() {
        System.out.println("get cars");
        List<CarsDTO> dtos = carsService.findAllCars();

        return ResponseEntity.ok(dtos);
    }

    @RequestMapping(value = "/car/insert", method = RequestMethod.POST)
    public ResponseEntity<?> insertCar(@RequestBody CarsInsertDTO carsInsertDTO) throws Exception {
        System.out.println("insert car?");
        String id = carsService.insert(carsInsertDTO);
        return ResponseEntity.ok("service with id:" + id + " inserted");
    }


    @RequestMapping(value = "/car/edit/status", method = RequestMethod.POST)
    public ResponseEntity<?> editCarStatus(@RequestBody CarStatusDTO carStatusDTO) throws Exception {
        System.out.println("miauuuuuuuuuuuuuuuu");
        carsService.updateCarStatus(carStatusDTO, carStatusDTO.getCarId());
        try{
            return ResponseEntity.ok(carStatusDTO.getCarId());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error editind car");
        }

    }

    @RequestMapping(value = "/car/get/problems", method = RequestMethod.GET)
    public ResponseEntity<?> getCarProblemsAndResDate() throws Exception {
        System.out.println("chhhhhhhhhhh mrrrrrrr");
        List<ProblemsDTO> dtos = carsService.findProblems();
        try{
            return ResponseEntity.ok(dtos);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error editind car");
        }

    }



}
