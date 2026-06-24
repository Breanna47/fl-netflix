import { Sparkle } from "lucide-react";
import Image from "next/image";
import DropdownMenu from "@/shared/ui/components/ui/DropdownMenu";
import DropdownMenuTrigger from "@/shared/ui/components/ui/DropdownMenu";

const Navbar = () => {
    return (
        <div className="fixed top-0 w-full flex justify-between px-12 py-4
        bg-transparent transition-colors duration-1000">
            <div className="flex gap-8 items-center">
                <h1 className="text-[#e50914] cursor-pointer text-[25px] font-bold">Netflix</h1>
                <ul className="flex gap-5 text-sm">
                    <li className="text-white cursor-pointer hover:text-[#b3b3b3] transition-colors">
                        Home
                    </li>
                    <li className="text-white cursor-pointer hover:text-[#b3b3b3] transition-colors">
                        Shows
                    </li>
                    <li className="text-white cursor-pointer hover:text-[#b3b3b3] transition-colors">
                        Movies
                    </li>
                    <li className="text-white cursor-pointer hover:text-[#b3b3b3] transition-colors">
                        Games
                    </li>
                </ul>
            </div>
            <div className="flex gap-[15px] items-center">
                <button className="cursor-pointer">
                 <Sparkle className="text-white" size={20} />   
                 </button>
                <Image 
                src="/assets/search.svg" 
                className="cursor-pointer" 
                width={24} 
                height={24}
                alt="Search"
                 />   
                 <Image 
                 src="/assets/notification.svg" 
                className="cursor-pointer" 
                width={24} 
                height={24}
                alt="Notification"
                 />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                 <button className="text-white cursor-pointer">
                    <Image 
                    src="/assets/profile.png"
                    height={32}
                    width={32}
                    alt="Profile"
                    className="rounded-[4px]"
                    />
                </button>
                </DropdownMenuTrigger>
                 </DropdownMenu>
            </div>
        </div>
    );
};

export default Navbar;
