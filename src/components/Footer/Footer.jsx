import './Footer.css';
function Footer() {
    return (
        <div className="footer">
            <a href='https://github.com/Taps73r/'>
                <div className='footer-link'>
                    <img src='./../footer_log.png' alt='github logo' />
                    Taps73r
                </div>
            </a>
            <div className='copyright'>
                Copyright <span className="material-symbols-outlined">
                    copyright
                </span> 2023-2024, Converso. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;