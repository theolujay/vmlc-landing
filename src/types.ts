import React from 'react';

// This file defines TypeScript interfaces (types).
// In Go, these are similar to 'structs'. In Python, they are like 'TypedDict', 'dataclasses', or Pydantic models.
// They define the "shape" of data objects to ensure type safety.

// Props interfaces define what arguments a React Component accepts.
export interface PillProps {
  text: string;
}

// Interfaces can 'extend' others, inheriting their properties (similar to embedding structs in Go or class inheritance in Python).
// Here, ButtonProps inherits standard HTML button attributes (like onClick, type, etc.) and adds our custom ones.
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'ghost'; // '?' means optional. Union types ('|') are like Enums.
  fullWidth?: boolean;
  href?: string;
  to?: string;
}

export interface StageSectionProps {
  title: string;
  description: string;
  pills: string[];
  imageSide: 'left' | 'right'; // In this design, "imageSide" effectively controls where the content block (Title/Desc) is vs the Pill block.
}

// This interface defines the shape of the data payload we expect for pre-registration.
export interface PreRegisterData {
  full_name: string;
  email: string;
  phone: string;
  interest_type: 'candidate' | 'volunteer';
}
