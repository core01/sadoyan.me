import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  faTelegram,
  faTwitter,
  faReddit,
  faLinkedin,
  faFacebookF,
  faVk,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  url: string;
}

const socials = [
  { Component: EmailShareButton, icon: faEnvelope, key: 'email' },
  { Component: FacebookShareButton, icon: faFacebookF, key: 'fb' },
  { Component: LinkedinShareButton, icon: faLinkedin, key: 'linkedin' },
  { Component: RedditShareButton, icon: faReddit, key: 'reddit' },
  { Component: TelegramShareButton, icon: faTelegram, key: 'telegram' },
  { Component: TwitterShareButton, icon: faTwitter, key: 'twitter' },
  { Component: VKShareButton, icon: faVk, key: 'vk' },
  { Component: WhatsappShareButton, icon: faWhatsapp, key: 'whatsapp' },
];

export const Share = ({ url }: IProps) => {
  const SocialButtons = socials.map(({ Component, icon, key }) => {
    return (
      <Component url={url} className="mr-4" key={key}>
        <FontAwesomeIcon icon={icon} className="hover:text-gray-700 text-lg" />
      </Component>
    );
  });

  return <div className="text-gray-400">{SocialButtons}</div>;
};
