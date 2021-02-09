import {makeAutoObservable} from "mobx";

const idGenerator = () => {
  return Math.random().toString(36).substr(2, 9);
};

export type TypeNotificationItem = {
  type: "success" | "error"
  text: string
  id: string
}

class NotificationState {
  notificationItems: TypeNotificationItem[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  addNotification: (item: {  type: "success" | "error", text: string}) => void = (item) => {
    this.notificationItems.push({...item, id: idGenerator()});
  };

  deleteNotification: (deleteId: string) => void = (deleteId) => {
    this.notificationItems = this.notificationItems.filter(({id}) => id !== deleteId);
  };
}

export default new NotificationState();