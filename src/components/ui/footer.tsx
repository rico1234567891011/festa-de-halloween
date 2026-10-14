// Crédito de rodapé, no fim da página.
export function Footer() {
  return (
    <footer className="relative z-10 w-full px-4 py-10 text-center sm:px-6 lg:px-8">
      <p className="text-sm text-lilas-luar/50">
        Feito por{" "}
        <a
          href="https://wa.me/5519996231906"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-lilas-luar/70 underline-offset-4 transition-colors hover:text-laranja-queimado hover:underline"
        >
          Enrico Orsi
        </a>{" "}
        · (19) 99623-1906
      </p>
    </footer>
  );
}
