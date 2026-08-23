import React from 'react';
import {
  getCurrentYear,
  getFooterCopy,
} from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer fixed bottom-0 left-0 z-10 w-full border-t-[3px] border-[var(--main-color)] bg-white p-4 text-center italic">
      <p>
        Copyright {getCurrentYear()} -{' '}
        {getFooterCopy(true)}
      </p>
    </div>
  );
}

export default Footer;
