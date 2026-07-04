"use client";
import { Film } from "lucide-react";
import { Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, DialogTitle } from "../ui/components/ui/Dialog";



interface INetflixGPTModalProps {
    isNetflixGPTModalOpen: boolean;
    setIsNetflixGPTModalOpen: (isOpen: boolean) => void;
}

const NetflixGPTModal = ({
    isNetflixGPTModalOpen, 
    setIsNetflixGPTModalOpen
}: INetflixGPTModalProps) => {
    return (

     <>
    <Dialog 
    open={isNetflixGPTModalOpen} 
    onOpenChange={() => setIsNetflixGPTModalOpen(false)}
    >
      <DialogContent className="bg-[#1a1a1a] max-w-2xl! w-full gap-10
      overflow-y-auto text-white border -[#333333]">
        <DialogHeader>

            <DialogTitle className="mb-2 flex gap-2 flex gap-2 items-center text-2xl font-bold">
                <Film className="w-6 h-6 text-[#ff0000]" />
                Find Your Perfect Movie
            </DialogTitle>
            <DialogDescription className="text-color-[#999999]">
                Adjust your prefences to get the best recommendations.
            </DialogDescription>
        </DialogHeader>         
            <div className="flex flex-col gap-5">
                <div className="flex gap-4 flex-col">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-[#f2f2f2]">Duration Range</label>
                        <span className="text-sm text-[#999]">10 min</span>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    </>
    );
};

export default NetflixGPTModal;