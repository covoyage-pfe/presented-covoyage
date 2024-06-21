import React, { useState } from 'react';
import { 
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Textarea,
    Button,
	Alert
} from '@/components/MaterialTailwind';


interface DialogProps {
    handleOpen: () => void
    receiver: string
    receiverUsername: string
    sender: string
    open: boolean
}

const MessageDialog = (props: DialogProps) => {
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSendMessage = () => {
		setSending(true);
        fetch('/api/v0/messages/', {
			method: 'POST',
			body: JSON.stringify({
				sender: props.sender,
				receiver: props.receiver,
				message: message
			})
        })
		.then(info => {
			if (info.status === 201) {
				setError(false)
				setSuccess(true)
			} else {
				setSuccess(false)
				setError(true)
			}
			setSending(false);
		})
		.catch(error => {
			console.log(error);
			setSuccess(false)
			setError(true);
			setSending(false);
		});
    }

    return (
        <Dialog open={props.open} size="xs" handler={props.handleOpen}>
			<div className="flex items-center justify-between">
				<DialogHeader className="flex flex-col items-start">
					<Typography className="mb-1" variant="h4">
					New message to @{props.receiverUsername}
					</Typography>
				</DialogHeader>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="mr-3 h-5 w-5"
					onClick={props.handleOpen}
				>
					<path
					fillRule="evenodd"
					d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
					clipRule="evenodd"
					/>
				</svg>
			</div>
			{!error && success ? <Alert className="my-2" variant="ghost" color="green">Message sent</Alert> :
			!success && error ? <Alert className="my-2" variant="ghost" color="red">Something went wrong please try again</Alert> :
			""}
			<DialogBody>
				<Typography className="mb-10 -mt-7 " color="gray" variant="lead">
					Write the message and then click send message.
				</Typography>
				<div className="grid gap-6">
					<Textarea label="Message" onChange={e => setMessage(e.target.value)}/>
				</div>
			</DialogBody>
			<DialogFooter className="space-x-2">
				<Button variant="text" color="blue" onClick={props.handleOpen}>
					cancel
				</Button>
				<Button variant="gradient" color="blue" onClick={handleSendMessage} disabled={sending}>
					send message
				</Button>
			</DialogFooter>
      	</Dialog>
    );
}

export default MessageDialog;