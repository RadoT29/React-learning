import PropTypes from 'prop-types'
import Button from './Button.js';
const Header = ({ title }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button />
        </header>
    );
}

Header.defaultProps = {
    title: 'I love Tomatoes',
}

export default Header;