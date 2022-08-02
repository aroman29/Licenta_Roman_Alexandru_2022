package ro.tuc.ds2020.services;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayOutputStream;
import javax.activation.DataSource;
import java.io.File;
import java.io.FileNotFoundException;

@Service
public class EmailService {

    private final JavaMailSender emailSender;

    private ByteArrayOutputStream outputStream = null;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }


    public void registerConfirmationEmail(String email, String parola) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        message.setSubject("New AutoFocus account!");
        String finalText = "<html><body></br>" +
                "<h1>Dear AutoFocus customer,</h1></br>" +
                "<h4>" + "You have a new account with email: " + email + "; and password: " + parola +  " !</h4></br>" +
                "</body></html>";
        helper.setText(finalText, true);
        emailSender.send(message);
    }

    public void sendNewMessageEmail(String email, String senderName, String messageText) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        message.setSubject("You have a new message!");
        String finalText = "<html><body></br>" +
                "<h1>Dear AutoFocus customer,</h1></br>" +
                "<h4>" + "You have a new message from " + senderName + " :" + messageText + " </h4></br>" +
                "</body></html>";
        helper.setText(finalText, true);
        emailSender.send(message);
    }
    public void sendCarFinishedEmail(String email, String carName) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        message.setSubject("You car is finished!");
        String finalText = "<html><body></br>" +
                "<h1>Dear AutoFocus customer,</h1></br>" +
                "<h4>" + "Your car is finished: " + carName + "</h4></br>" +
                "</body></html>";
        helper.setText(finalText, true);
        emailSender.send(message);
    }

//    public void sendBillEmail(String to, String fileName, AddReservationDto addReservationDto, Reservations reservation, Court court) throws MessagingException, DocumentException, FileNotFoundException {
//        MimeMessage message = emailSender.createMimeMessage();
//        byte[] encodedBytes = Base64.encodeBase64(to.getBytes());
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//        helper.setTo(to);
//
//        message.setSubject("Tennis Courts reservation");
//        outputStream = new ByteArrayOutputStream();
//
//        PdfService pdfService = new PdfService();
//        pdfService.generateBillReservation(outputStream,reservation,court,addReservationDto );
//        byte[] bytes = outputStream.toByteArray();
//        DataSource dataSource = new ByteArrayDataSource(bytes, "application/pdf");
//        var finalText = "<html><body></br>" +
//                "<h1>Rezervarea dumneavoastra</h1></br>" +
//                "</body></html>";
//        helper.setText(finalText, true);
//        helper.addAttachment(fileName,dataSource);
//        emailSender.send(message);
//    }


}
