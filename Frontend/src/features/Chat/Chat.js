import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import messageActions from '../../redux/actions/MessageActions';
import AfPage from '../../components/Page/Page';
import AfInput from '../../components/Input/Input';
import AfButton from '../../components/Button/Button';
import RbMessage from '../../components/Message/Message';
import { compareDates, composeName } from '../../utils/utils';
import { BUTTON_TYPES, MESSAGE_STATUS, USER_TYPE } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import './style.scss';
import MessageActions from '../../redux/actions/MessageActions';

const Chat = () => {

  const [chatPartner, setChatPartener] = useState("");
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const messageEndRef = useRef(null);
  const messagesRef = useRef(null);
  const isAtBottom = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');

  const users = useSelector((state) => state.user.users);
  const cars = useSelector((state) => state.car.cars);
  const services = useSelector((state) => state.service.services);
  const currentUser = useSelector((state) => state.user.currentUser);
  const receiverUserId = useSelector((state) => state.message.partnerId);

  const messages = useSelector((state) => state.message.messages).filter((message) =>  // mesajele cu partenetul din redux
  ((currentUser?.id === message?.senderId && receiverUserId === message?.receiverId) 
  || (currentUser?.id === message?.receiverId && receiverUserId === message?.senderId)));

  const [selectedPartner, setSelectedPartner] = useState('');
  const [chatParteners, setChatParteners] = useState('');

  const previousMessages = useRef(chatMessages);

  useEffect(() => {
    
    let partener = users.find((user) => user.id === receiverUserId);
    let serviceClients = []
    console.log(receiverUserId, partener);
    if(partener !== undefined)
      setChatPartener(composeName(partener?.firstName, partener?.lastName));
    else if(serviceClients.length > 0)
    setChatPartener(composeName(serviceClients[0].firstName, serviceClients[0].lastName));

    setChatMessages()

  }, []);

  useEffect(() => {
    console.log(chatMessages);
    if (previousMessages.current.length === 0) {
      messageEndRef.current?.scrollIntoView();
    } else if (chatMessages.length > previousMessages.current.length
      && chatMessages[chatMessages.length - 1].props.user
      // || !previousMessages.current[previousMessages.current.length - 1].props.user
      ) {
      messageEndRef.current?.scrollIntoView();
    }

    // if (isAtBottom.current) {
    //   messageEndRef.current.scrollIntoView();
    // }

    previousMessages.current = chatMessages;
  }, [chatMessages]);

  useEffect(() => {
    setUnseenMessages(messages.filter((message) => message?.receiverId === currentUser?.id
  && message?.seen === false));
    unseenMessages.map((message) => dispatch(MessageActions.seenMessage(message.id)));
  }, [messages]);

  function formattedTooltip(message) {
    const sender = users?.find((user) => user?.id === message?.senderId);
    const dateTime = message?.datetime;

    const date = dateTime?.split('T')[0];
    const hours = dateTime?.split('T')[1].split(':');

    return `${sender?.lastName} ${sender?.firstName} - ${date} - ${hours[0]}:${hours[1]}`;
  }


const onSubmit = (data) => {
  console.log(data.msg);
  if (data.msg !== '') {

    dispatch(messageActions.addMessage(
      currentUser?.id,
      receiverUserId,
      data?.msg,
      new Date()
    ));
    setValue('msg', '');
    messageEndRef.current.scrollIntoView();
  }
  
};

useEffect(() => {
  const currentMessages = messages.map((message, index) => {
    if (message?.id) {
      return (
        <RbMessage
          dataContent={formattedTooltip(message)}
          key={message.id}
          message={message.message}
          user={currentUser.id === message.senderId}
          hasIcon={!!((index === messages.length - 1
            || messages[index + 1].senderId !== message.senderId))}
          sendTime={message.datetime ? message.datetime?.split('T')[0] : ''}
          showTime={index === 0 || compareDates(messages[index - 1], message) < 0}
        />
      );
    }
    return '';
  });

  isAtBottom.current = messagesRef.current?.scrollHeight - messagesRef.current?.scrollTop
    === messagesRef.current?.clientHeight;
  setChatMessages(currentMessages);
}, [messages]);

  return (
  <AfPage
    title="Messages"
    icon={faComments}
    rightText={chatPartner === '-' ? '' : chatPartner}
    topBarClass="message-top-bar"
    >
      {(messages.length
      && (
      <div ref={messagesRef} className="messages-container">
        {chatMessages}
        {!unseenMessages.length && messages[messages.length - 1]?.senderId === currentUser.id
        && messages[messages.length - 1]?.status === MESSAGE_STATUS.read
        && (
        <div className="seen-container">
          <div className="seen-message">{translate('MESSAGES.seen')}</div>
        </div>
        )}
        <div ref={messageEndRef} />
      </div>
      )) || (receiverUserId && (
        <div className="empty-messages-container">
          <Trans i18nKey="MESSAGES.emptyMessage" values={{ user: chatPartner }} components={[<b />]} />
        </div>
      ))}


      <form className="send-message" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          
            <AfInput
              placeholder={translate('MESSAGES.messagePlaceholder')}
              disabled={!receiverUserId}
              {...register('msg')}
            />
          
        </div>

        <AfButton
          buttonIcon={faArrowRight}
          type="submit"
          buttonType={BUTTON_TYPES.primary}
          disabled={!receiverUserId}
          small
        />
        
      </form>
      <div className="selector">
      </div>
  
  </AfPage>
  );
}

export default Chat;
