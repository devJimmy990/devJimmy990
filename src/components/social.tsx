import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

const socials = [
    { label: "Github", path: "", icon: <FaGithub /> },
    { label: "Linkedin", path: "", icon: <FaLinkedin /> },
    { label: "Youtube", path: "", icon: <FaYoutube /> },
    { label: "Facebook", path: "", icon: <FaFacebook /> },
]
const Social = ({ containerStyle, iconStyle }: { containerStyle: string, iconStyle: string }) => {
    return (
        <div className={containerStyle}>
            {socials.map((social) => <Link
                href={social.path}
                key={social.label}
                className={iconStyle}>{social.icon}
            </Link>)}
        </div>
    );
}

export default Social;
