import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const NewAccountSheet = () => {
    return (
       <Sheet open>
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