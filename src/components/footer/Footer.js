import './Footer.scss';

const Footer = () => {
	return (
		<footer className='Footer'>
			Design + code by{' '}
			<a
				href='https://miwayagi.com/'
				target='_blank'
				className='link'
				rel='noreferrer'
			>
				Miwa Kaur
			</a>
			. View code at{' '}
			<a
				href='https://github.com/peeweemiwie/weather-app-react-2.0'
				target='_blank'
				className='link'
				rel='noreferrer'
			>
				GitHub
			</a>
		</footer>
	);
};

export default Footer;
