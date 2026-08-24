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
        <footer className="App-footer mt-auto w-full border-t-[3px] border-[var(--main-color)] bg-white p-4 text-center text-sm italic">
          <p>
            Copyright {getCurrentYear()} -{' '}
            {getFooterCopy(true)}
          </p>

          {user && user.isLoggedIn && (
            <p>
              <a
                href="mailto:contact@holbertonschool.com"
                className="text-[var(--main-color)] underline"
              >
                Contact us
              </a>
            </p>
          )}
        </footer>
      )}
    </NewContext.Consumer>
  );
}

export default Footer;
