const Footer = () => {
  return (
    <footer className="text-custom-text-blue font-bold py-8 flex items-center justify-center">
      <div className="container mx-auto text-center px-4">
        <p className="text-lg md:text-xl">
          &copy; {new Date().getFullYear()} Morel Mathias - Quiz de culture
          générale. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
