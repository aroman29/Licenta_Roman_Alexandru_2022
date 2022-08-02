package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.CarsDTO;
import ro.tuc.ds2020.dtos.ProblemsDTO;
import ro.tuc.ds2020.entities.Cars;
import ro.tuc.ds2020.entities.Problems;

import java.time.LocalDate;
import java.util.Date;

public class CarsBuilder {

    public CarsBuilder() {
    }

    public static CarsDTO toCarsDTO(Cars cars){
        return new CarsDTO(cars.getId(),
                cars.getMark(),
                cars.getServiceName().getId(),
                cars.getUserOwner().getId(),
                cars.getModel(),
                cars.getGeneration(),
                cars.getFabricationDate(),
                cars.getCombustible(),
                cars.getStatus(),
                cars.getTotalPrice());
    }

    public static ProblemsDTO toProblemsDTO(Problems problem, LocalDate date, String carId){
        return new ProblemsDTO(date, problem.isOption0(), problem.isOption1(), problem.isOption2(), problem.isOption3(), problem.isOption4(),
                problem.isOption5(), problem.getNotes(), carId);
    }

//    public static Cars toEntity(CarsDTO carsDTO) {
//        return new Cars(carsDTO.getId(), carsDTO.getMark(), carsDTO.getServiceName(), carsDTO.getUserOwner(),
//                carsDTO.getModel(),carsDTO.getGeneration(), carsDTO.getFabricationDate(), carsDTO.getCombustible(), carsDTO.getStatus(), carsDTO.getTotalPrice());
//    }
}
