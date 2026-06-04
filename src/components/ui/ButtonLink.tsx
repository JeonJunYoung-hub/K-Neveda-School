import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type ButtonLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'secondary';
  }
>;

export function ButtonLink({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`button-link button-link--${variant} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
