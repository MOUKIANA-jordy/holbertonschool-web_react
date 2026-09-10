import PropTypes from 'prop-types';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

const loggedOutUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

function Footer({ user = loggedOutUser }) {
  return (
    <footer className="App-footer mt-auto w-full border-t-[3px] border-[var(--main-color)] bg-white p-4 text-center text-sm italic">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>

      {user.isLoggedIn && (
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
  );
}

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};

export default Footer;

