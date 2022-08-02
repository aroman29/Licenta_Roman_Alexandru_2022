package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.tuc.ds2020.dtos.*;
import ro.tuc.ds2020.dtos.builders.CarsBuilder;
import ro.tuc.ds2020.entities.*;
import ro.tuc.ds2020.repositories.*;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CarsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarsService.class);
    private final CarsRepository carsRepository;
    private final ServicesRepository servicesRepository;
    private final UsersRepository usersRepository;
    private final ReservationRepository reservationRepository;
    private final ProblemsRepository problemsRepository;
    private final EmailService emailService;

    @Autowired
    public CarsService(CarsRepository carsRepository,
                       ServicesRepository servicesRepository,
                       UsersRepository usersRepository,
                       ReservationRepository reservationRepository,
                       ProblemsRepository problemsRepository,
                       EmailService emailService
                       ) {
        this.carsRepository = carsRepository;
        this.usersRepository = usersRepository;
        this.servicesRepository = servicesRepository;
        this.reservationRepository = reservationRepository;
        this.problemsRepository = problemsRepository;
        this.emailService = emailService;
    }

    public List<CarsDTO> findAllCars() {
        List<Cars> carsList = carsRepository.findAll();
        List<CarsDTO> dtos = new ArrayList<CarsDTO>();
        for (Cars c: carsList
             ) {
            if(c.getStatus() != CarStatuses.PICKED && c.getStatus() != CarStatuses.CANCELED){
                dtos.add(CarsBuilder.toCarsDTO(c));
            }
        }
        return dtos;
    }

    public List<ProblemsDTO> findProblems() {
        List<ProblemsDTO> problems = new ArrayList<ProblemsDTO>();
        List<Cars> carsList = carsRepository.findAll();
        for (Cars c: carsList
             ) {
            Optional<Problems> problem = problemsRepository.findById(c.getProblems().getId());
            Optional<Reservation> reservation = reservationRepository.findById(c.getReservation().getId());
            problems.add(CarsBuilder.toProblemsDTO(problem.get(), reservation.get().getResDate(), c.getId()));
        }

        return problems;
    }

    public String insert(CarsInsertDTO carsInsertDTO) {
        CarsDTO carsDTO = new CarsDTO();

        String ServiceId = carsInsertDTO.getServiceName();
        Optional<Services> service = servicesRepository.findById(ServiceId);
        String userId = carsInsertDTO.getUserOwner();
        Optional<Users> user = usersRepository.findById(userId);


        Cars car = new Cars();
        car.setId(carsInsertDTO.getId());
        car.setMark(carsInsertDTO.getMark());
        car.setServiceName(service.get());
        car.setUserOwner(user.get());
        car.setModel(carsInsertDTO.getModel());
        car.setGeneration(carsInsertDTO.getGeneration());
        car.setFabricationDate(carsInsertDTO.getFabricationDate());
        car.setCombustible(carsInsertDTO.getCombustible());
        car.setStatus(carsInsertDTO.getStatus());
        car.setTotalPrice(carsInsertDTO.getTotalPrice());
        car.setId(UUID.randomUUID().toString());
        car = carsRepository.save(car);

        LOGGER.debug("Car with id {} was inserted in db", car.getId());
        return car.getId();
    }

    @Transactional
    public CarsDTO updateCarStatus(CarStatusDTO carStatusDTO, String id) throws MessagingException {

        carsRepository.editCars(id, carStatusDTO.getStatus());
        Optional<Cars> updated = carsRepository.findById(id);
        CarsDTO carsDTO = CarsBuilder.toCarsDTO(updated.get());
        Optional<Users> owner = usersRepository.findById(carsDTO.getUserId());
        if(carStatusDTO.getStatus() == CarStatuses.FINISHED)
            emailService.sendCarFinishedEmail(owner.get().getEmail(), carsDTO.getModel() + " " + carsDTO.getMark() + " " + carsDTO.getGeneration());

        return new CarsDTO();
    }

}
