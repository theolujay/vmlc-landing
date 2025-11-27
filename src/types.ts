import React from 'react';

export interface PillProps {
  text: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'ghost';
  fullWidth?: boolean;
  href?: string;
}

export interface StageSectionProps {
  title: string;
  description: string;
  pills: string[];
  imageSide: 'left' | 'right'; // In this design, "imageSide" effectively controls where the content block (Title/Desc) is vs the Pill block.
}