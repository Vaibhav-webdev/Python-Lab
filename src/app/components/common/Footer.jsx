import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../../../public/logo.png';

const Footer = () => {
  // Dynamic year generation so you don't have to update it manually
  const currentYear = new Date().getFullYear();

  return (
    // Semantic <footer> tag
    <footer className="bg-black border-t border-white/10 pt-10 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">ScriptCrush Footer Navigation</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Layout - Flex use kiya hai elements ko center karne ke liye */}
        <nav aria-label="Footer Navigation"className="flex flex-col items-center justify-center text-center w-full">

          {/* Brand Section */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md w-fit"
          >
            <Image
              src={logoImg}
              alt="ScriptCrush - JavaScript Learning Platform"
              priority
              className="h-8 w-auto md:h-12"
            />
            <span className="text-white font-bold text-2xl lg:text-3xl tracking-wide">Script Crush</span>
          </Link>

          {/* Mission Text - Margin top (mt-4) aur max-width di hai taaki text center me achha dikhe */}
          <p className="mt-4 text-gray-400 text-sm lg:text-lg leading-relaxed max-w-sm lg:max-w-xl mx-auto">
            Master JavaScript through interactive tutorials, coding challenges, bug fixing, mini projects, mock interviews and an online code editor.
          </p>

        </nav>

        {/* Bottom Bar: Copyright and Divider */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            © {currentYear} ScriptCrush. All rights reserved. Built for JavaScript developers worldwide.
          </p>

          <div className="flex gap-6 text-xs lg:text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;