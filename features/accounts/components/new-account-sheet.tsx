import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";

export const NewAccountSheet = () => {
    const {isOpen, onClose} = useNewAccount();

    return (
       <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Akun Baru
                    </SheetTitle>

                    <SheetDescription>
                        Buat akun baru untuk melacak transaksi Anda
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
       </Sheet>
    )
}