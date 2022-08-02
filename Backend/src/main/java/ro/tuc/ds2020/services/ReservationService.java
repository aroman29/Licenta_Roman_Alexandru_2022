package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.ReservationDTO;
import ro.tuc.ds2020.dtos.ReservationInsertDTO;
import ro.tuc.ds2020.dtos.builders.ReservationBuilder;
import ro.tuc.ds2020.dtos.builders.ServiceBuilder;
import ro.tuc.ds2020.entities.*;
import ro.tuc.ds2020.repositories.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReservationService.class);
    private final ReservationRepository reservationRepository;
    private final CarsRepository carsRepository;
    private final UsersRepository usersRepository;
    private final ServicesRepository servicesRepository;
    private final ProblemsRepository problemsRepository;


    @Autowired
    public ReservationService(ReservationRepository reservationRepository, CarsRepository carsRepository,
                              UsersRepository usersRepository, ServicesRepository servicesRepository, ProblemsRepository problemsRepository

    ) {
        this.reservationRepository = reservationRepository;
        this.carsRepository = carsRepository;
        this.usersRepository = usersRepository;
        this.servicesRepository = servicesRepository;
        this.problemsRepository = problemsRepository;
    }

    public List<ReservationDTO> findAllReservations() {
        List<Reservation> reservationList = reservationRepository.findAll();
        return reservationList.stream()
                .map(ReservationBuilder::toReservationDTO)
                .collect(Collectors.toList());

    }

    public String insert(ReservationInsertDTO reservationInsertDTO) {

        reservationInsertDTO.toString();

        Cars car = new Cars();
        Reservation reservation = new Reservation();
        Problems problems = new Problems();

        Optional<Services> service = servicesRepository.findById(reservationInsertDTO.getServiceId());
        Optional<Users> user = usersRepository.findById(reservationInsertDTO.getUserId());


        reservation.setId(UUID.randomUUID().toString());
        reservation.setResDate(reservationInsertDTO.getDate());

        problems.setId(UUID.randomUUID().toString());
        problems.setOption0(reservationInsertDTO.isOption0());
        problems.setOption1(reservationInsertDTO.isOption1());
        problems.setOption2(reservationInsertDTO.isOption2());
        problems.setOption3(reservationInsertDTO.isOption3());
        problems.setOption4(reservationInsertDTO.isOption4());
        problems.setOption5(reservationInsertDTO.isOption5());
        problems.setNotes(reservationInsertDTO.getNotes());

        car.setId(UUID.randomUUID().toString());
        car.setCombustible(reservationInsertDTO.getCombustible());
        car.setGeneration(reservationInsertDTO.getGeneration());
        car.setServiceName(service.get());
        car.setMark(reservationInsertDTO.getMark());
        car.setModel(reservationInsertDTO.getModel());
        car.setStatus(CarStatuses.WAITING);
        car.setFabricationDate(reservationInsertDTO.getFabricationDate());
        car.setTotalPrice(0);
        car.setUserOwner(user.get());
        car.setReservation(reservation);
        car.setProblems(problems);
        carsRepository.save(car);

        reservation.setCar(car);
        problems.setCar(car);

        reservationRepository.save(reservation);
        problemsRepository.save(problems);


        LOGGER.debug("Car with id {} was inserted in db", car.getId());
        return car.getId();
    }
}
