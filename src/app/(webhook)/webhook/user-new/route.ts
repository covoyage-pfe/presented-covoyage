import { Webhook } from 'svix';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { handlerUserCreated } from '@/lib/api/webhookHandlers';

function getWebhookSecretKey() {
    if (process.env.NODE_ENV !== 'production') {
        if (process.env.DEV_NAME === "Rayane") {
            return process.env.WEBHOOK_NEW_USER_KEY_DEVR;
        } else if (process.env.DEV_NAME === "Kaoutar") {
            return process.env.WEBHOOK_NEW_USER_KEY_DEVK;
        } else {
            return process.env.WEBHOOK_NEW_USER_KEY_DEVF;
        }
    } else {
        return ''
    }
}


export async function POST(req: NextRequest) {
    console.log("test-post")
    const WEBHOOK_SECRET = getWebhookSecretKey();
    if (!WEBHOOK_SECRET) {
        console.log("WEBHOOK secret key not found : " + process.env.DEV_NAME)
        return Response.json({error: "WEBHOOK secret key not found"}, {status: 500})
    }
    
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.log("Error occurred -- svix headers missing")
        return new Response('Error occurred -- svix headers missing', {status: 400})
    }
    
    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);
    
    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {status: 400});
    }

    // Get the ID and type
    const eventType = evt.type;

    switch (eventType) {
        case 'user.created':
            const res = await handlerUserCreated(evt);
            return Response.json(res[0], res[1]);
        default:
            return Response.json({message: "unhandle event/request sent"}, {status: 200});
    }
}