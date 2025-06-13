import className from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface Button1Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
}

function Button1({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}: Button1Props) {
  // Enforce that only one of the variation props is true
  const variationCount =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!success) +
    Number(!!warning) +
    Number(!!danger);

  if (variationCount > 1) {
    throw new Error('Only one of primary, secondary, success, warning, or danger can be true.');
  }

  const classes = className(
    rest.className,
    'flex items-center px-3 py-1.5 border h-8',
    {
      'opacity-50': loading,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-500 bg-gray-500 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-500 bg-yellow-500 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white!': outline,
      'text-blue-500': outline && primary,
      'text-gray-500': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-500': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <div>
      <button disabled={loading} {...rest} className={classes}>
        {loading ? <CircularProgress size={20} /> : children}
      </button>
    </div>
  );
}

export default Button1;
