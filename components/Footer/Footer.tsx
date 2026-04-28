import SocialLinks from '@/components/SocialLinks/SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-shadow mt-auto p-10 sm:flex sm:items-center sm:justify-between">
      <p className="m-0 mr-8">
        Copyright &copy; {new Date().getFullYear()} Daniel W Robert. All rights reserved.
      </p>
      <SocialLinks />
    </footer>
  );
}
