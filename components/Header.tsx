import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faTwitter, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <header className="p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">
                <Link href="/">
                    <a className="font-mono no-underline py-2 text-base text-red-700">
                        Sadoyan Roman
                    </a>
                </Link>

            </h1>
            <ul className="flex items-center text-xl">
                <li className="mr-3 md:mr-6">
                    <Link href="https://t.me/core01">
                        <a className="text-red-700" target="_blank" rel="noopener">
                            <FontAwesomeIcon icon={faTelegram} />
                        </a>
                    </Link>
                </li>
                <li className="mr-3 md:mr-6">
                    <Link href="https://twitter.com/RASadoyan">
                        <a className="text-red-700" target="_blank" rel="noopener">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </Link>
                </li>
                <li className="mr-3 md:mr-6">
                    <Link href="https://github.com/core01/">
                        <a className="text-red-700" target="_blank" rel="noopener">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </Link>
                </li>
                <li className="mr-3 md:mr-6">
                    <Link href="https://gitlab.com/core01/">
                        <a className="text-red-700" target="_blank" rel="noopener">
                            <FontAwesomeIcon icon={faGitlab} />
                        </a>
                    </Link>
                </li>
                <li className="mr-3 md:mr-6">
                    <Link href="mailto:roman@sadoyan.me">
                        <a className="text-red-700" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </Link>
                </li>
            </ul>
        </header>
    )
}