package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.tuc.ds2020.dtos.MessagesDTO;
import ro.tuc.ds2020.dtos.UsersDTO;
import ro.tuc.ds2020.dtos.builders.MessageBuilder;
import ro.tuc.ds2020.dtos.builders.UsersBuilder;
import ro.tuc.ds2020.entities.Messages;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.repositories.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessagesService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReservationService.class);

    private final MessagesRepository messagesRepository;
    private final UsersRepository usersRepository;


    @Autowired
    public MessagesService(MessagesRepository messagesRepository,UsersRepository usersRepository

    ) {
        this.messagesRepository = messagesRepository;
        this.usersRepository = usersRepository;
    }

    public MessagesDTO insert(MessagesDTO messagesDTO) {
        Optional<Users> sender = usersRepository.findById(messagesDTO.getSenderId());
        Optional<Users> receiver = usersRepository.findById(messagesDTO.getReceiverId());
        Messages message = MessageBuilder.toMessages(messagesDTO, sender.get(), receiver.get());
        messagesRepository.save(message);
        return messagesDTO;

    }

    public List<MessagesDTO> getMessages() {
        List<Messages> messagesList = messagesRepository.findAll();
        List<MessagesDTO> dtos = new ArrayList<>();
        for (Messages m: messagesList
             ) {
            if(m.isActive()) {
                dtos.add((MessageBuilder.toMessageDTO(m)));
            }
        }
        return dtos;
    }

    @Transactional
    public MessagesDTO setMessageToSeen(String id){
        messagesRepository.editSeenMessage(id);
        Optional<Messages> updated = messagesRepository.findById(id);
        MessagesDTO dto = MessageBuilder.toMessageDTO(updated.get());
        return dto;
    }


}











