package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.tuc.ds2020.dtos.CarStatusDTO;
import ro.tuc.ds2020.dtos.CarsDTO;
import ro.tuc.ds2020.dtos.UsersDTO;
import ro.tuc.ds2020.dtos.builders.CarsBuilder;
import ro.tuc.ds2020.dtos.builders.UsersBuilder;
import ro.tuc.ds2020.entities.Cars;
import ro.tuc.ds2020.entities.Messages;
import ro.tuc.ds2020.entities.Services;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.repositories.MessagesRepository;
import ro.tuc.ds2020.repositories.ServicesRepository;
import ro.tuc.ds2020.repositories.UsersRepository;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsersService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersService.class);
    private final UsersRepository usersRepository;
    private final ServicesRepository servicesRepository;
    private final EmailService emailService;
    private final MessagesRepository messagesRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository, ServicesRepository servicesRepository, EmailService emailService,
                        MessagesRepository messagesRepository
    ) {
        this.usersRepository = usersRepository;
        this.servicesRepository = servicesRepository;
        this.emailService = emailService;
        this.messagesRepository = messagesRepository;
    }

    public List<UsersDTO> findUsers() {
        List<Users> usersList = usersRepository.findAll();
        List<UsersDTO> usersListDTO = new ArrayList<UsersDTO>();

        for (Users u: usersList
             ) {
            if(u.isActive()){
                if(u.getServiceAssigned() != null && u.getRole().equals("1"))
                    usersListDTO.add(UsersBuilder.toUsersDTO(u, u.getServiceAssigned().getId()));
                else usersListDTO.add(UsersBuilder.toUsersDTO(u));
            }
        }

        return usersListDTO;
    }

    public UsersDTO findUser(String email, String password) throws Exception {
        Optional<Users> foundUser = usersRepository.findByEmail(email);
        if(foundUser.get().getPassword().equals(password)){
            if(foundUser.get().isActive()) {
                if (foundUser.isPresent() && foundUser.get().getServiceAssigned() != null && foundUser.get().getRole().equals("1"))
                    return UsersBuilder.toUsersDTO(foundUser.get(), foundUser.get().getServiceAssigned().getId());
                else return UsersBuilder.toUsersDTO(foundUser.get());
            }
        }
        throw new Exception("no user was found");
    }

    public String insert(UsersDTO usersDTO) throws MessagingException {
        System.out.println(usersDTO.getEmail());
        Users user = UsersBuilder.toNewEntity(usersDTO);
        user.setActive(true);
        if(usersDTO.getServiceId() != null)
            user.setServiceAssigned(servicesRepository.findById(usersDTO.getServiceId()).get());
        user = usersRepository.save(user);
        emailService.registerConfirmationEmail(user.getEmail(), user.getPassword());

        LOGGER.debug("Person with id {} was inserted in db", user.getId());
        return user.getId();
    }

    @Transactional
    public UsersDTO deleteUserById(String id){

        usersRepository.deleteEditUser(id);
        List<Messages> messages = messagesRepository.findAll();
        Optional<Users> updated = usersRepository.findById(id);

        for (Messages m : messages
             ) {
            if (m.getSender().getId().equals(id)){
//                System.out.println("sender: " + m.getSender().getId() + " -> " + id);
                messagesRepository.deleteMessageByBoolean(m.getId());
            }
            if (m.getReceiver().getId().equals(id)){
//                System.out.println("receiver: " + m.getReceiver().getId() + " -> " + id);
                messagesRepository.deleteMessageByBoolean(m.getId());
            }
        }

        UsersDTO dto = UsersBuilder.toUsersDTO(updated.get());

        return dto;
    }
}
