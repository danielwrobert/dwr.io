import SocialLinks from '@/components/SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-shadow mt-auto p-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 mr-5">&copy; {new Date().getFullYear()} DWR.IO</p>
      <SocialLinks />
    </footer>
  );
}
