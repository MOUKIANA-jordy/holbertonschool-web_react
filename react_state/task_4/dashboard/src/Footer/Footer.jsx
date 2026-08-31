import React from 'react';
import AppContext from '../Context/context';
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

      <AppContext.Consumer>
        {({ user }) =>
          user &&
          user.isLoggedIn && (
            <p>
              <a
                href="#"
                className="text-[var(--main-color)] underline"
              >
                Contact us
              </a>
            </p>
          )
        }
      </AppContext.Consumer>
    </div>
  );
}

export default Footer;
