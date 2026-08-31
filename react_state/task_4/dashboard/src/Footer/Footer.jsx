import React from 'react';
import NewContext from '../Context/context';
import {
  getCurrentYear,
  getFooterCopy,
} from '../utils/utils';

function Footer() {
  return (
    <NewContext.Consumer>
      {({ user }) => (
        <div className="App-footer mt-auto w-full border-t-[3px] border-[var(--main-color)] bg-white p-4 text-center text-base italic max-[912px]:p-3 max-[520px]:text-sm">
          <p>
            Copyright {getCurrentYear()} -{' '}
            {getFooterCopy(true)}
          </p>

          {user.isLoggedIn && (
            <p>
              <a
                href="#"
                className="text-[var(--main-color)] underline"
              >
                Contact us
              </a>
            </p>
          )}
        </div>
      )}
    </NewContext.Consumer>
  );
}

export default Footer;
