import { useSelector } from 'react-redux';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

function Footer() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <footer className="App-footer border-t-[3px] border-[var(--main-color)] p-4 text-center italic">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>

      {isLoggedIn && (
        <p>
          <a
            href="#contact"
            className="text-[var(--main-color)] underline"
          >
            Contact us
          </a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
