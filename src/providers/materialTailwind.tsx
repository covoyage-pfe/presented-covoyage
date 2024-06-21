"use client";
import React, { ReactNode } from 'react';
import { ReactNodeLike } from 'prop-types';
import { ThemeProvider } from "@material-tailwind/react";


/**
 * This component is a wrapper that wrap all the application with the material
 * tailwind theme provider
 * 
 * 
 * @param props the props of this component that content the children which
 * represent all the pages and component of the app
 * @returns A component that wrap all the elements of the app with the material
 * tailwind theme provider
 */
export default function MaterialTailwindProvider({children}: {children: NonNullable<ReactNodeLike>}) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}
