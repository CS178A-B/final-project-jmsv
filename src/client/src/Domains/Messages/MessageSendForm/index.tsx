import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SubmitButton from 'Components/SubmitButton';
import { TextFormField } from 'Components/TextFormField';
import { AuthContext } from 'Contexts/AuthContext';
import { IUser } from 'Domains/Accounts/api';
import { io, sendMessage } from 'Domains/Messages/api';
import { Field, Form, Formik } from 'formik';
import useApi from 'hooks/useApi';
import React from 'react';
import * as yup from 'yup';

export interface IMessageSendForm {
    content: string;
}

const formSchema = yup.object({
    content: yup.string().required('Message cannot be empty.'),
});

const messageInitialValues: IMessageSendForm = {
    content: '',
};

interface MessageSendFormProps {
    receiver: IUser | undefined;
}

function MessageSendForm({ receiver }: MessageSendFormProps) {
    const [message, setMessage] = React.useState<IMessageSendForm>(
        messageInitialValues
    );

    const { user } = React.useContext(AuthContext);

    const request = React.useCallback(() => sendMessage(message, receiver), [
        message,
        receiver,
    ]);
    const [sendRequest, isLoading] = useApi(request, {
        onSuccess: () => {
            io.emit('new_message', {
                content: message.content,
                receiver: receiver,
                sender: {
                    id: user?.userId,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                },
            });
        },
    });

    return (
        <div>
            {receiver === undefined ? (
                <div></div>
            ) : (
                <Paper style={{ padding: 30 }}>
                    <Formik
                        validationSchema={formSchema}
                        initialValues={messageInitialValues}
                        onSubmit={(formValues, actions) => {
                            setMessage(formValues);
                            sendRequest();
                            actions.resetForm({
                                values: { ...messageInitialValues },
                            });
                        }}
                    >
                        {() => (
                            <Form>
                                <Grid
                                    item
                                    container
                                    spacing={5}
                                    direction='row'
                                    justify='space-evenly'
                                    alignItems='center'
                                >
                                    <Grid item xs={8}>
                                        <Field
                                            name='content'
                                            label='Message'
                                            component={TextFormField}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={2}>
                                        <SubmitButton
                                            fullWidth={true}
                                            type='submit'
                                            isLoading={isLoading}
                                            disabled={receiver === undefined}
                                        >
                                            Send
                                        </SubmitButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            )}
        </div>
    );
}

export default MessageSendForm;
