import Link from "next/link";

interface BtnTextProps {
  texto: string;
  href: string;
}

export default function BtnText({ texto, href }: BtnTextProps) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center justify-center py-2 px-1 text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded"
    >
      {texto}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}