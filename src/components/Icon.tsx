import * as React from 'react';

export type IconProps = {
  /**
   * Icon type, find at https://fontawesome.com/icons
   */
  type: string;

  /**
   * Extra classes to add to the icon
   */
  className?: string;

  /**
   * Scales the icon
   */
  size?: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

  /**
   * Adds a title attribute to the resulting icon for accessibility
   */
  title?: string;
};

export const Icon = ({ type, className, title, size }: IconProps) => (
  <i
    className={`icon fas fa-${type}${className ? ' ' + className : ''}${size ? ' fa-' + size : ''}`}
    title={title}
  />
)
