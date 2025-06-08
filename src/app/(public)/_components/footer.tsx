export function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">
            <span className="text-primary">CON</span>TEMP
          </span>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
