package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.MessagesDTO;
import ro.tuc.ds2020.entities.Messages;
import ro.tuc.ds2020.entities.Users;

import java.util.Optional;

public class MessageBuilder {

    public static MessagesDTO toMessageDTO(Messages message) {
        return new MessagesDTO(
                message.getId(),
                message.getMessage(),
                message.isSeen(),
                message.getTime(),
                message.getSender().getId(),
                message.getReceiver().getId(),
                message.isActive()
        );
    }

    public static Messages toMessages(MessagesDTO messagesDTO, Users sender, Users receiver) {
        return new Messages(
                messagesDTO.getId(),
                messagesDTO.getMessage(),
                messagesDTO.isSeen(),
                messagesDTO.getDatetime(),
                sender,
                receiver,
                messagesDTO.isActive()

        );
    }
}
