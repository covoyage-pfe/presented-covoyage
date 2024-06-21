import { Typography } from "@/components/MaterialTailwind";
 
export default function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between mt-10">
      <Typography color="blue-gray" className="font-normal flex justify-center text-center w-full">
        &copy; 2023 Kaoutar RBIE - Youness FAIK - Rayane TOKO
      </Typography>
    </footer>
  );
}