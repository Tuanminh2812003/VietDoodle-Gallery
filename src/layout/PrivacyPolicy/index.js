import './PrivacyPolicy.scss';

function PrivacyPolicy(){
    return(
        <>
            <div className='privacy'>
                <h1>Privacy Policy</h1>
                <h3>
                    Personal data
                </h3>
                <div>
                    VietDoodle Gallery has never collected and will never collect any personal data, browsing history, etc.
                </div>
                <div>
                    In the future, VietDoodle Gallery may collect browser version, platform name, display settings, and user filter settings (excluding any data that could identify users such as website lists or any other data). This information is necessary to make decisions regarding the deployment of new features, removal of unused features, or propose default settings for new users. It will only occur with your permission.
                </div>
                <h3>
                    Third party services
                </h3>
                <div>
                    VietDoodle Gallery uses Chrome (Chromium) or WebExtensions synchronous storage API to store user settings and the browser's web storage API (localStorage) to store user bug reports for the Developer Tools.
                </div>
                <div>
                    VietDoodle Gallery does not charge users and also does not accept donations in any form.
                </div>
                <h3>
                    The website
                </h3>
                <div>
                    For statistical purposes, the website <i>"https://viet-doodle-gallery.vercel.app/"</i> counts page views and link clicks. The language and time zone of visitors are anonymously sent to the web server.
                </div>
                <div className="disc">
                    Updated: February 9, 2022 
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy;