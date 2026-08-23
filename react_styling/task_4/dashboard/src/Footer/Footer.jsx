import React from 'react';
import {
  getCurrentYear,
  getFooterCopy,
} from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer mt-auto w-full border-t-[3px] border-[var(--main-color)] bg-white p-4 text-center text-base italic max-[912px]:p-3 max-[520px]:text-sm">
      <p>
        Copyright {getCurrentYear()} -{' '}
        {getFooterCopy(true)}
      </p>
    </div>
  );
}

export default Footer;
