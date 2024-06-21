import React, { ReactNode } from 'react';
import { ClerkProvider as DefaultClerkProvider } from '@clerk/nextjs'


/**
 * This component is a wrapper that wrap all the application with the clerk
 * provider
 * 
 * 
 * @param props the props of this component that content the children which
 * represent all the pages and component of the app
 * @returns A component that wrap all the elements of the app with the clerk
 * provider
 */
export default function ClerkProvider({children}: {children: ReactNode}) {
    return (
        <DefaultClerkProvider>
            {children}
        </DefaultClerkProvider>
    );
}
