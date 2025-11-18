import React, { useState } from 'react';
import { Input } from '@shadcn-components/ui/input';
import { handleCopyClick } from '@utils/wallet';
import { cn } from '@lib/utils';

function SuccessCustomIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  );
}

function CopyCustomIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
    >
      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
    </svg>
  );
}
export default function InputBaseCopy(props: {
  onClick?: (value: any) => void;
  onChange?: (value: any) => void;
  value: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [copied, setCopied] = useState(false);
  const COPY_TIMEOUT = 2000;

  const handleCopy = (e: React.MouseEvent) => {
    if (!props.value) return;

    if (props?.onClick) {
      props.onClick(e);
    } else {
      handleCopyClick(props?.value ?? '');
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, COPY_TIMEOUT);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type="string"
          className="mt-4 pr-9"
          value={props.value}
          onChange={props?.onChange}
          disabled={props?.disabled}
          placeholder={props?.placeholder}
        />
        <button
          className={cn(
            'absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 rounded-sm p-1 inline-flex items-center justify-center',
            props.value &&
              'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer',
            !props.value && 'cursor-not-allowed opacity-50',
          )}
          onClick={handleCopy}
          disabled={!props.value}
        >
          {copied ? <SuccessCustomIcon /> : <CopyCustomIcon />}
        </button>
      </div>
    </div>
  );
}
