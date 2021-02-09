import React                                               from 'react';
import {observer}                                          from "mobx-react-lite";
import {StyledNotificationItem, StyledNotificationWrapper} from "./styles";
import notificationState, {TypeNotificationItem}               from "../../store/notificationState";
import {TextButton}                                        from "../globalStyledComponents";
import {ModalDialogDone}                                   from "../../icons/ui/ModalDialogDone";
import {ModalDialogError}                                  from "../../icons/ui/ModalDialogError";

const NotificationItem = ({id, type, text}: TypeNotificationItem) => {

  React.useEffect(() => {
    setTimeout(() => {
      notificationState.deleteNotification(id);
    }, 3500)
  }, [])

  return (
    <StyledNotificationItem>
      {type === "success" && <ModalDialogDone/>}
      {type === "error" && <ModalDialogError/>}
      <TextButton>{text}</TextButton>
    </StyledNotificationItem>
  )
};

const Notifications = observer(() => {
  return (
    <StyledNotificationWrapper>
      {notificationState.notificationItems.map(item => <NotificationItem key={item.id} {...item}/>)}
    </StyledNotificationWrapper>
  );
});

export default Notifications;