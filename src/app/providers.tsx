'use client';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import React from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
      <RecoilRoot>{children}</RecoilRoot>
  );
};