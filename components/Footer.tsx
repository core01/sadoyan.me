import { faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex justify-center border-t border-gray-100 py-10 mt-auto">
      © {new Date().getFullYear()} Roman Sadoyan{' '}
      <Link
        href="/rss.xml"
        className="text-red-700 ml-4"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faRss} />
      </Link>
    </div>
  );
};
