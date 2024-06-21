import React from 'react';
import { ReactNodeLike } from 'prop-types';
import ClerkProvider from './clerk';
import MaterialTailwindProvider from './materialTailwind';


/**
 * This component is a wrapper that wrap all the application with all
 * the providers of the application
 * 
 * 
 * @param props the props of this component that content the children which
 * represent all the pages and component of the app
 * @returns A component that wrap all the elements of the app with all the
 * providers used in the application
 */
export default function Providers({children}: {children: NonNullable<ReactNodeLike>}) {
    return (
        <ClerkProvider>
            <MaterialTailwindProvider>
                {children}
            </MaterialTailwindProvider>
        </ClerkProvider>
    );
}
