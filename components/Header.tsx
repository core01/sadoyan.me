import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        <Link href="/" className="font-mono no-underline py-2 text-base text-red-700">
          Sadoyan Roman
        </Link>
      </h1>
      <ul className="flex items-center text-xl">
        <li className="mr-3 md:mr-6">
          <Link href="https://t.me/core01" className="text-red-700" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faTelegram} />
          </Link>
        </li>
        <li className="mr-3 md:mr-6">
          <Link href="https://twitter.com/RASadoyan" className="text-red-700" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
        </li>
        <li className="mr-3 md:mr-6">
          <Link href="https://github.com/core01/" className="text-red-700" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </li>
        <li className="mr-3 md:mr-6">
          <Link href="https://gitlab.com/core01/" className="text-red-700" target="_blank" rel="noopener">
            <FontAwesomeIcon icon={faGitlab} />
          </Link>
        </li>
        <li className="mr-3 md:mr-6">
          <Link href="mailto:roman@sadoyan.me" className="text-red-700" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </li>
      </ul>
    </header>
  );
}
