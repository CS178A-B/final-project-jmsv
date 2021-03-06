import API, { serverPath } from 'api';
import * as socketio_client from 'socket.io-client';
import { IMessageSendForm } from 'Domains/Messages/MessageSendForm';
import { INewMessageForm } from 'Domains/Messages/NewMessageForm';
import { IUser } from 'Domains/Accounts/api';

export interface IMessage {
    content: string;
    sender: IUser;
    receiver: IUser;
    date: string;
}

export interface IConversation {
    user: IUser;
    latestMessage: IMessage;
}

export async function sendMessage(message: IMessageSendForm, receiver?: IUser) {
    return API.post('message/sendMessage', {
        content: message.content,
        receiverId: receiver?.id,
    });
}

export async function getMessages(page: number, messanger?: IUser) {
    const params = {
        messangerId: messanger?.id,
        page,
    };
    return API.get<{ messages: IMessage[]; messagesCount: number }>(
        `message/getMessages`,
        { params }
    );
}

export async function getConversationList() {
    return API.get<{ conversationList: IConversation[] }>(
        'message/getConversationList'
    );
}

export async function createMessage(newMessageForm: INewMessageForm) {
    return API.get<{ user: IUser; error: string }>(
        `message/get-user-by-email/${newMessageForm.email}`
    );
}

export const io: SocketIOClient.Socket = socketio_client.connect(serverPath);
