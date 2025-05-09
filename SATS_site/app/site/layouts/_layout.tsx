// disallows viewing of pages within this folder....
import React from 'react';
import Unauthorized from './unauthorized';

export default function SiteLayout() {
  return (
    <Unauthorized />
  );
}
