import { useState } from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-r from-slate-800 to-slate-700 text-gray-300 px-6 py-10">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div>
          <img src={assets.estate_logo} alt="Estate home logo" className="mb-3" />
          <p className="text-sm leading-relaxed text-gray-400">
            Estate helps buyers find thoughtfully designed homes and helps
            families move confidently into the next chapter of their lives.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer"><a href="#Home">Home</a></li>
            <li className="hover:text-blue-400 cursor-pointer"><a href="#About">About us</a></li>
            <li className="hover:text-blue-400 cursor-pointer"><a href="#Contact">Contact us</a></li>
            <li>
              <button
                type="button"
                className="hover:text-blue-400 cursor-pointer"
                onClick={() => setShowPrivacy(true)}
              >
                Privacy policy
              </button>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          {/* <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-slate-700 text-sm outline-none text-white placeholder-gray-400"
            />
            <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-r-md text-sm">
              Subscribe
            </button>
          </div> */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom border-t border-slate-700 mt-8 pt-4 text-sm text-gray-500">
        <span>Copyright 2026 © Estate. All Right Reserved.</span>
        <span className="developer-credit">Developed by <strong>Mukesh Yadav</strong></span>
      </div>
      </footer>

      {showPrivacy && (
        <div className="privacy-modal-backdrop" role="presentation" onClick={() => setShowPrivacy(false)}>
          <section
            className="privacy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="privacy-modal-close"
              aria-label="Close privacy policy"
              onClick={() => setShowPrivacy(false)}
            >
              ×
            </button>
            <p className="privacy-modal-label">Estate privacy policy</p>
            <h2 id="privacy-title">Your information stays protected</h2>
            <p>
              We collect only the information needed to create your account,
              help you discover properties, and respond to your enquiries.
            </p>
            <p>
              Your contact details are used by Estate for account access and
              property communication. We do not sell your personal information
              to third parties.
            </p>
            <p>
              You can request an update or deletion of your account information
              by contacting our support team through the Contact section.
            </p>
            <button type="button" className="privacy-modal-action" onClick={() => setShowPrivacy(false)}>
              Close
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default Footer;