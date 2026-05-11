import SocialLinks from '@/components/SocialLinks/SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-shadow mt-auto p-6 sm:flex sm:items-center sm:justify-between">
      <p className="m-0 mr-5">&copy; {new Date().getFullYear()} DWR.IO</p>
      <SocialLinks />
    </footer>
  );
}
